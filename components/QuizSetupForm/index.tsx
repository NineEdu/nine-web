"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Save, Loader2, Sparkles } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmModal } from "@/modals/ConfirmModals";
import useModal from "@/modals/useModal";
import quizApis from "@/shared/apis/quizApis";
import { notifyError, notifyInfo, notifySuccess } from "../Notify";

// --- SCHEMA ---
const questionSchema = z.object({
  questionText: z.string().min(1, "Question is required"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least 2 options"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  explanation: z.string().optional(),
});

const quizFormSchema = z.object({
  title: z.string().min(3, "Title is required"),
  passingScore: z.coerce.number().min(1),
  questions: z.array(questionSchema).min(1, "At least 1 question required"),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

interface QuizSetupFormProps {
  lessonId: string;
  courseId: string;
  lessonTitle?: string;
  onSuccess?: () => void;
}

export const QuizSetupForm = ({
  lessonId,
  courseId,
  lessonTitle,
  onSuccess,
}: QuizSetupFormProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [existingQuizId, setExistingQuizId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { show: showConfirmModal } = useModal(ConfirmModal);

  const form = useForm({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: "",
      passingScore: 5,
      questions: [
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          explanation: "",
        },
      ],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "questions",
  });

  // 1. Fetch Quiz Data
  const fetchQuiz = async () => {
    try {
      setIsLoading(true);
      const quiz = await quizApis.getQuizByLesson({ lessonId });

      if (quiz && quiz._id) {
        setExistingQuizId(quiz._id);
        reset({
          title: quiz.title,
          passingScore: quiz.passingScore,
          questions: quiz.questions.map((q: any) => ({
            questionText: q.questionText,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation || "",
          })),
        });
      }
    } catch (error) {
      console.log("No existing quiz found, ready to create new one.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (lessonId) fetchQuiz();
  }, [lessonId]);

  // --- HÀM GỌI AI ---
  const handleGenerateAI = async () => {
    if (!lessonTitle) {
      notifyError("Không tìm thấy nội dung bài học để tạo câu hỏi");
      return;
    }

    try {
      setIsGenerating(true);
      notifyInfo("AI processing...");

      // Gọi API AI (đảm bảo bạn đã implement aiApis.generateQuiz ở frontend)
      const questions = await quizApis.generateQuiz(lessonTitle);

      if (questions && Array.isArray(questions) && questions.length > 0) {
        // Thay thế toàn bộ câu hỏi hiện tại bằng câu hỏi của AI
        replace(questions);
        notifySuccess(`Successfully generated ${questions.length} questions!`);
      } else {
        notifyError("AI returned no valid questions.");
      }
    } catch (error) {
      notifyError(
        "AI is busy or encountered an error. Please try again later."
      );
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 2. Handle Submit
  const onSubmit = async (data: QuizFormValues) => {
    try {
      if (existingQuizId) {
        await quizApis.updateQuiz({
          quizId: existingQuizId,
          data: { ...data, lessonId, courseId },
        });
        notifySuccess("Quiz updated successfully!");
      } else {
        await quizApis.createQuiz({
          ...data,
          lessonId,
          courseId,
        });
        notifySuccess("Quiz created successfully!");
      }
      await fetchQuiz();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      notifyError(error.message || "Failed to save quiz");
    }
  };

  // 3. Handle Delete
  const onDeleteQuiz = () => {
    showConfirmModal({
      title: "Delete Quiz",
      content:
        "Are you sure you want to delete this quiz? This action cannot be undone.",
      labels: { cancel: "Cancel", action: "Delete" },
      onAction: async () => {
        try {
          if (existingQuizId) {
            await quizApis.deleteQuiz({ quizId: existingQuizId });
            notifySuccess("Quiz deleted successfully");
            setExistingQuizId(null);
            reset({
              title: "",
              passingScore: 5,
              questions: [
                {
                  questionText: "",
                  options: ["", "", "", ""],
                  correctAnswer: "",
                  explanation: "",
                },
              ],
            });
            if (onSuccess) onSuccess();
          }
        } catch (error: any) {
          notifyError(error.message || "Failed to delete quiz");
        }
      },
      async: true,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-60 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        <p className="text-sm text-slate-500">Loading quiz data...</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full pr-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 w-full mx-auto py-2 px-1"
      >
        <div className="flex items-center justify-between sticky top-0 bg-white z-10 py-4 border-b">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {existingQuizId ? "Edit Quiz" : "Create Quiz"}
            </h2>
            <p className="text-sm text-slate-500">
              {existingQuizId
                ? "Modify questions and settings"
                : "Add a new quiz for this lesson"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* --- NÚT AI --- */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGenerateAI}
              disabled={isGenerating || isSubmitting}
              className="bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100 hover:text-indigo-700"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Auto-Generate
                </>
              )}
            </Button>

            {existingQuizId && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                onClick={onDeleteQuiz}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting || isGenerating}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting
                ? "Saving..."
                : existingQuizId
                ? "Update Quiz"
                : "Create Quiz"}
            </Button>
          </div>
        </div>

        {/* Quiz Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quiz Title</Label>
                <Input
                  {...register("title")}
                  placeholder="e.g. Final Assessment"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Passing Score (Number of correct answers)</Label>
                <Input type="number" {...register("passingScore")} />
                {errors.passingScore && (
                  <p className="text-red-500 text-xs">
                    {errors.passingScore.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <div className="space-y-4">
          {fields?.map((field, qIndex) => {
            const currentOptions = watch(`questions.${qIndex}.options`);

            return (
              <Card key={field.id} className="relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                <CardContent className="pt-6 pl-6 pr-10">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => remove(qIndex)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase text-slate-500">
                        Question {qIndex + 1}
                      </Label>
                      <Textarea
                        {...register(`questions.${qIndex}.questionText`)}
                        placeholder="Enter the question here..."
                        className="resize-none"
                      />
                      {errors.questions?.[qIndex]?.questionText && (
                        <p className="text-red-500 text-xs">
                          {errors.questions[qIndex]?.questionText?.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentOptions?.map((_, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                            {String.fromCharCode(65 + oIndex)}
                          </div>
                          <Input
                            {...register(
                              `questions.${qIndex}.options.${oIndex}`
                            )}
                            placeholder={`Option ${oIndex + 1}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <Select
                          onValueChange={(val) =>
                            setValue(`questions.${qIndex}.correctAnswer`, val)
                          }
                          value={watch(`questions.${qIndex}.correctAnswer`)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select correct option" />
                          </SelectTrigger>
                          <SelectContent>
                            {currentOptions?.map((opt, idx) => (
                              <SelectItem
                                key={idx}
                                value={opt || `empty-${idx}`}
                              >
                                {opt
                                  ? `${String.fromCharCode(65 + idx)}. ${opt}`
                                  : `Option ${idx + 1} (Empty)`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.questions?.[qIndex]?.correctAnswer && (
                          <p className="text-red-500 text-xs">
                            {errors.questions[qIndex]?.correctAnswer?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Explanation (Optional)</Label>
                        <Input
                          {...register(`questions.${qIndex}.explanation`)}
                          placeholder="Why is this correct?"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed border-2 py-8 hover:border-indigo-500 hover:text-indigo-600"
          onClick={() =>
            append({
              questionText: "",
              options: ["", "", "", ""],
              correctAnswer: "",
              explanation: "",
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" /> Add Question
        </Button>
      </form>
    </ScrollArea>
  );
};
