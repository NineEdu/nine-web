import { notifyError, notifySuccess } from "@/components/Notify";
import enrollmentApis from "@/shared/apis/enrollmentApis";
import { useMutation } from "@tanstack/react-query";

const mutationFn = async ({ courseId }: { courseId: string }) => {
  return await enrollmentApis.joinCourse({ courseId });
};

//@ts-ignore
const useEnrollCourse = (mutationOptions) => {
  const mutation = useMutation({ mutationFn, ...mutationOptions });
  const enrollCourse = async ({ courseId }: { courseId: string }) => {
    try {
      //@ts-ignore
      const res = await mutation.mutateAsync({ courseId });
      notifySuccess("Enrolled in course successfully");
      return res;
    } catch (error) {
      notifyError(error);
      return error;
    }
  };

  return { enrollCourse, ...mutation };
};

export default useEnrollCourse;
