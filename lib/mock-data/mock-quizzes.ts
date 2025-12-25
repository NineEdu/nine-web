// ============================================
// MOCK QUIZ DATA
// ============================================

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'multiple-answer';
  options: string[];
  correctAnswer: number | number[]; // index or indices
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  passingScore: number; // percentage
  questions: QuizQuestion[];
}

// ============================================
// BLOCKCHAIN QUIZZES
// ============================================

export const QUIZ_BLOCKCHAIN_BASIC: Quiz = {
  id: 'quiz-blockchain-basic',
  title: 'Bài kiểm tra Blockchain cơ bản',
  description: 'Kiểm tra kiến thức cơ bản về Blockchain và các khái niệm liên quan.',
  duration: 10,
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      question: 'Blockchain là gì?',
      type: 'multiple-choice',
      options: [
        'Một loại tiền điện tử',
        'Một cơ sở dữ liệu phân tán không thể thay đổi',
        'Một ngôn ngữ lập trình',
        'Một phần mềm kế toán'
      ],
      correctAnswer: 1,
      explanation: 'Blockchain là một cơ sở dữ liệu phân tán, lưu trữ thông tin dưới dạng các khối được liên kết với nhau.'
    },
    {
      id: 'q2',
      question: 'Bitcoin có phải là Blockchain không?',
      type: 'true-false',
      options: ['Đúng', 'Sai'],
      correctAnswer: 1,
      explanation: 'Bitcoin được xây dựng trên công nghệ Blockchain, nhưng Blockchain không chỉ là Bitcoin.'
    },
    {
      id: 'q3',
      question: 'Smart Contract có thể làm những gì?',
      type: 'multiple-answer',
      options: [
        'Tự động thực thi các điều khoản hợp đồng',
        'Lưu trữ dữ liệu trên blockchain',
        'Xử lý giao dịch tự động',
        'Thay thế hoàn toàn luật pháp'
      ],
      correctAnswer: [0, 1, 2],
      explanation: 'Smart Contract tự động hóa việc thực thi hợp đồng nhưng vẫn cần tuân theo luật pháp.'
    },
    {
      id: 'q4',
      question: 'Đặc điểm nào KHÔNG phải của Blockchain?',
      type: 'multiple-choice',
      options: [
        'Tính minh bạch',
        'Tính bất biến',
        'Tính tập trung',
        'Tính bảo mật'
      ],
      correctAnswer: 2,
      explanation: 'Blockchain là hệ thống phân tán (decentralized), không có cơ quan trung tâm kiểm soát.'
    },
    {
      id: 'q5',
      question: 'Mining trong Blockchain là gì?',
      type: 'multiple-choice',
      options: [
        'Khai thác tài nguyên thiên nhiên',
        'Xác minh và thêm giao dịch vào blockchain',
        'Đào tiền điện tử từ lòng đất',
        'Hack vào hệ thống blockchain'
      ],
      correctAnswer: 1,
      explanation: 'Mining là quá trình xác thực giao dịch và thêm block mới vào blockchain.'
    }
  ]
};

export const QUIZ_BLOCKCHAIN_ADVANCED: Quiz = {
  id: 'quiz-blockchain-advanced',
  title: 'Kiểm tra Blockchain nâng cao',
  description: 'Đánh giá tổng hợp kiến thức về Blockchain và Smart Contract.',
  duration: 20,
  passingScore: 80,
  questions: [
    {
      id: 'q1',
      question: 'Consensus mechanism nào được Bitcoin sử dụng?',
      type: 'multiple-choice',
      options: [
        'Proof of Stake',
        'Proof of Work',
        'Delegated Proof of Stake',
        'Proof of Authority'
      ],
      correctAnswer: 1,
      explanation: 'Bitcoin sử dụng Proof of Work (PoW), yêu cầu miners giải các bài toán phức tạp để xác thực giao dịch.'
    },
    {
      id: 'q2',
      question: 'Ethereum có thể thực thi Smart Contract?',
      type: 'true-false',
      options: ['Đúng', 'Sai'],
      correctAnswer: 0,
      explanation: 'Ethereum được thiết kế đặc biệt để hỗ trợ Smart Contracts thông qua Ethereum Virtual Machine (EVM).'
    },
    {
      id: 'q3',
      question: 'Các thành phần của một block trong Blockchain bao gồm:',
      type: 'multiple-answer',
      options: [
        'Hash của block trước',
        'Timestamp',
        'Dữ liệu giao dịch',
        'Thông tin cá nhân của người dùng'
      ],
      correctAnswer: [0, 1, 2],
      explanation: 'Mỗi block chứa hash của block trước, timestamp, và data (không bao gồm thông tin cá nhân trực tiếp).'
    },
    {
      id: 'q4',
      question: 'Private key trong Blockchain dùng để làm gì?',
      type: 'multiple-choice',
      options: [
        'Mở khóa ví để gửi tiền',
        'Nhận tiền từ người khác',
        'Xem thông tin blockchain',
        'Tất cả các đáp án trên'
      ],
      correctAnswer: 0,
      explanation: 'Private key được dùng để ký giao dịch và chứng minh quyền sở hữu tài sản.'
    },
    {
      id: 'q5',
      question: 'Gas fee trong Ethereum là gì?',
      type: 'multiple-choice',
      options: [
        'Phí giao dịch',
        'Chi phí lưu trữ',
        'Thuế nhà nước',
        'Lợi nhuận của miner'
      ],
      correctAnswer: 0,
      explanation: 'Gas fee là phí giao dịch được trả cho miners để xử lý và xác thực giao dịch trên Ethereum.'
    },
    {
      id: 'q6',
      question: 'DeFi là viết tắt của gì?',
      type: 'multiple-choice',
      options: [
        'Decentralized Finance',
        'Digital Finance',
        'Distributed Finance',
        'Defined Finance'
      ],
      correctAnswer: 0,
      explanation: 'DeFi (Decentralized Finance) là tài chính phi tập trung, không cần trung gian như ngân hàng.'
    },
    {
      id: 'q7',
      question: 'NFT có thể đại diện cho tài sản vật lý?',
      type: 'true-false',
      options: ['Đúng', 'Sai'],
      correctAnswer: 0,
      explanation: 'NFT có thể đại diện cho cả tài sản số và tài sản vật lý như bất động sản, nghệ thuật.'
    },
    {
      id: 'q8',
      question: 'Ưu điểm của blockchain trong supply chain:',
      type: 'multiple-answer',
      options: [
        'Truy xuất nguồn gốc',
        'Tăng tính minh bạch',
        'Giảm chi phí vận chuyển',
        'Chống hàng giả'
      ],
      correctAnswer: [0, 1, 3],
      explanation: 'Blockchain giúp truy xuất nguồn gốc, tăng minh bạch và chống hàng giả, nhưng không trực tiếp giảm chi phí vận chuyển.'
    },
    {
      id: 'q9',
      question: '51% attack là gì?',
      type: 'multiple-choice',
      options: [
        'Kiểm soát hơn 51% hash power của mạng',
        'Chiếm 51% số coin',
        'Sở hữu 51% nodes',
        'Hack 51% ví'
      ],
      correctAnswer: 0,
      explanation: '51% attack xảy ra khi một thực thể kiểm soát hơn 51% sức mạnh tính toán của mạng blockchain.'
    },
    {
      id: 'q10',
      question: 'Fork trong blockchain là gì?',
      type: 'multiple-choice',
      options: [
        'Chia tách chuỗi khối thành hai phiên bản',
        'Gộp hai blockchain lại',
        'Xóa một block',
        'Tạo block mới'
      ],
      correctAnswer: 0,
      explanation: 'Fork là sự chia tách blockchain thành hai phiên bản, có thể là soft fork hoặc hard fork.'
    }
  ]
};

// ============================================
// SMART CONTRACT QUIZZES
// ============================================

export const QUIZ_SMART_CONTRACT_BASIC: Quiz = {
  id: 'quiz-smart-contract-basic',
  title: 'Bài kiểm tra Smart Contract cơ bản',
  description: 'Kiểm tra kiến thức cơ bản về Smart Contract và Solidity.',
  duration: 15,
  passingScore: 75,
  questions: [
    {
      id: 'q1',
      question: 'Smart Contract là gì?',
      type: 'multiple-choice',
      options: [
        'Một loại hợp đồng giấy thông minh',
        'Chương trình tự động thực thi trên blockchain',
        'Một loại tiền điện tử',
        'Phần mềm quản lý hợp đồng'
      ],
      correctAnswer: 1,
      explanation: 'Smart Contract là chương trình máy tính tự động thực thi các điều khoản được mã hóa trên blockchain.'
    },
    {
      id: 'q2',
      question: 'Solidity là ngôn ngữ lập trình chính của Ethereum?',
      type: 'true-false',
      options: ['Đúng', 'Sai'],
      correctAnswer: 0,
      explanation: 'Solidity là ngôn ngữ lập trình chính được sử dụng để viết Smart Contracts trên Ethereum.'
    },
    {
      id: 'q3',
      question: 'Smart Contract có thể thay đổi sau khi deploy?',
      type: 'true-false',
      options: ['Đúng', 'Sai'],
      correctAnswer: 1,
      explanation: 'Smart Contract là immutable (bất biến) sau khi deploy, không thể thay đổi code.'
    },
    {
      id: 'q4',
      question: 'Đặc điểm nào của Smart Contract?',
      type: 'multiple-answer',
      options: [
        'Tự động thực thi',
        'Minh bạch',
        'Không thể thay đổi',
        'Cần sự can thiệp của con người'
      ],
      correctAnswer: [0, 1, 2],
      explanation: 'Smart Contract tự động thực thi, minh bạch, và không thể thay đổi sau khi deploy.'
    },
    {
      id: 'q5',
      question: 'Ứng dụng nào KHÔNG phù hợp với Smart Contract?',
      type: 'multiple-choice',
      options: [
        'Thanh toán tự động',
        'Quản lý supply chain',
        'Dự báo thời tiết',
        'Bỏ phiếu điện tử'
      ],
      correctAnswer: 2,
      explanation: 'Smart Contract cần dữ liệu xác định và logic rõ ràng, không phù hợp với dự báo thời tiết.'
    },
    {
      id: 'q6',
      question: 'EVM là gì?',
      type: 'multiple-choice',
      options: [
        'Ethereum Virtual Machine',
        'Electronic Voting Machine',
        'Enhanced Value Method',
        'Encrypted Verification Mode'
      ],
      correctAnswer: 0,
      explanation: 'EVM (Ethereum Virtual Machine) là môi trường thực thi Smart Contracts trên Ethereum.'
    },
    {
      id: 'q7',
      question: 'Payable function trong Solidity dùng để làm gì?',
      type: 'multiple-choice',
      options: [
        'Nhận ETH',
        'Gửi email',
        'Lưu trữ dữ liệu',
        'Xóa contract'
      ],
      correctAnswer: 0,
      explanation: 'Payable function cho phép Smart Contract nhận ETH từ người dùng.'
    }
  ]
};

export const QUIZ_SOLIDITY_ADVANCED: Quiz = {
  id: 'quiz-solidity-advanced',
  title: 'Kiểm tra Solidity nâng cao',
  description: 'Đánh giá kiến thức chuyên sâu về Solidity và best practices.',
  duration: 25,
  passingScore: 80,
  questions: [
    {
      id: 'q1',
      question: 'Modifier trong Solidity dùng để làm gì?',
      type: 'multiple-choice',
      options: [
        'Thay đổi giá trị biến',
        'Kiểm tra điều kiện trước khi thực thi function',
        'Khai báo biến',
        'Import library'
      ],
      correctAnswer: 1,
      explanation: 'Modifier được dùng để kiểm tra điều kiện (như quyền truy cập) trước khi thực thi function.'
    },
    {
      id: 'q2',
      question: 'Fallback function được gọi khi nào?',
      type: 'multiple-choice',
      options: [
        'Khi contract nhận ETH mà không có data',
        'Khi có lỗi xảy ra',
        'Khi contract được deploy',
        'Khi function không tồn tại'
      ],
      correctAnswer: 3,
      explanation: 'Fallback function được gọi khi function được gọi không tồn tại trong contract.'
    },
    {
      id: 'q3',
      question: 'Storage và Memory khác nhau như thế nào?',
      type: 'multiple-choice',
      options: [
        'Storage lưu vĩnh viễn, Memory tạm thời',
        'Storage miễn phí, Memory tốn phí',
        'Storage nhanh hơn Memory',
        'Không có sự khác biệt'
      ],
      correctAnswer: 0,
      explanation: 'Storage lưu trữ dữ liệu vĩnh viễn trên blockchain, Memory chỉ tồn tại trong quá trình thực thi function.'
    },
    {
      id: 'q4',
      question: 'Reentrancy attack là gì?',
      type: 'multiple-choice',
      options: [
        'Tấn công bằng cách gọi lại function trước khi nó hoàn thành',
        'Tấn công DDoS',
        'Tấn công bằng virus',
        'Tấn công qua email'
      ],
      correctAnswer: 0,
      explanation: 'Reentrancy attack xảy ra khi attacker gọi lại function trước khi state được update.'
    },
    {
      id: 'q5',
      question: 'Best practices nào để bảo vệ khỏi Reentrancy?',
      type: 'multiple-answer',
      options: [
        'Sử dụng Checks-Effects-Interactions pattern',
        'Sử dụng ReentrancyGuard',
        'Update state trước khi call external',
        'Không cần bảo vệ'
      ],
      correctAnswer: [0, 1, 2],
      explanation: 'Nên update state trước external call và sử dụng ReentrancyGuard để bảo vệ.'
    },
    {
      id: 'q6',
      question: 'View và Pure function khác nhau như thế nào?',
      type: 'multiple-choice',
      options: [
        'View đọc state, Pure không đọc state',
        'View tốn gas, Pure miễn phí',
        'Không có sự khác biệt',
        'Pure đắt hơn View'
      ],
      correctAnswer: 0,
      explanation: 'View function có thể đọc state nhưng không thay đổi, Pure không đọc cũng không thay đổi state.'
    },
    {
      id: 'q7',
      question: 'Event trong Solidity dùng để làm gì?',
      type: 'multiple-answer',
      options: [
        'Log thông tin lên blockchain',
        'Frontend có thể listen',
        'Tiết kiệm gas so với lưu trữ',
        'Thay thế cho biến'
      ],
      correctAnswer: [0, 1, 2],
      explanation: 'Event dùng để log thông tin, frontend có thể listen, và tiết kiệm gas hơn lưu trữ.'
    },
    {
      id: 'q8',
      question: 'Ownable pattern là gì?',
      type: 'multiple-choice',
      options: [
        'Pattern quản lý quyền sở hữu contract',
        'Pattern lưu trữ dữ liệu',
        'Pattern tính toán',
        'Pattern gửi ETH'
      ],
      correctAnswer: 0,
      explanation: 'Ownable pattern cho phép chỉ owner mới có quyền thực thi một số functions.'
    }
  ]
};

// ============================================
// WEB3 & DEFI QUIZZES
// ============================================

export const QUIZ_WEB3_BASIC: Quiz = {
  id: 'quiz-web3-basic',
  title: 'Bài kiểm tra Web3 cơ bản',
  description: 'Kiểm tra kiến thức về Web3, DeFi và ứng dụng phi tập trung.',
  duration: 15,
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      question: 'Web3 khác Web2 ở điểm nào?',
      type: 'multiple-choice',
      options: [
        'Web3 sử dụng blockchain',
        'Web3 nhanh hơn',
        'Web3 rẻ hơn',
        'Không có sự khác biệt'
      ],
      correctAnswer: 0,
      explanation: 'Web3 sử dụng blockchain và cho phép người dùng sở hữu dữ liệu của mình.'
    },
    {
      id: 'q2',
      question: 'DApp là gì?',
      type: 'multiple-choice',
      options: [
        'Decentralized Application',
        'Digital Application',
        'Distributed Application',
        'Dynamic Application'
      ],
      correctAnswer: 0,
      explanation: 'DApp (Decentralized Application) là ứng dụng chạy trên blockchain, không có server trung tâm.'
    },
    {
      id: 'q3',
      question: 'Wallet trong Web3 dùng để làm gì?',
      type: 'multiple-answer',
      options: [
        'Lưu trữ private key',
        'Ký giao dịch',
        'Kết nối với DApps',
        'Thay thế browser'
      ],
      correctAnswer: [0, 1, 2],
      explanation: 'Wallet lưu trữ private key, ký giao dịch và kết nối với DApps.'
    },
    {
      id: 'q4',
      question: 'MetaMask là gì?',
      type: 'multiple-choice',
      options: [
        'Crypto wallet browser extension',
        'Programming language',
        'Blockchain platform',
        'Exchange'
      ],
      correctAnswer: 0,
      explanation: 'MetaMask là ví điện tử dạng browser extension phổ biến nhất cho Ethereum.'
    },
    {
      id: 'q5',
      question: 'DeFi có thể thay thế ngân hàng truyền thống?',
      type: 'true-false',
      options: ['Đúng', 'Sai'],
      correctAnswer: 0,
      explanation: 'DeFi có tiềm năng thay thế nhiều dịch vụ ngân hàng truyền thống như cho vay, giao dịch.'
    },
    {
      id: 'q6',
      question: 'Yield Farming là gì?',
      type: 'multiple-choice',
      options: [
        'Cung cấp thanh khoản để kiếm lãi',
        'Khai thác tiền điện tử',
        'Mua bán NFT',
        'Staking coin'
      ],
      correctAnswer: 0,
      explanation: 'Yield Farming là việc cung cấp thanh khoản cho các pool DeFi để kiếm rewards.'
    },
    {
      id: 'q7',
      question: 'DAO là viết tắt của gì?',
      type: 'multiple-choice',
      options: [
        'Decentralized Autonomous Organization',
        'Digital Asset Organization',
        'Distributed Application Operation',
        'Dynamic Allocation Operator'
      ],
      correctAnswer: 0,
      explanation: 'DAO là tổ chức tự trị phi tập trung, được quản lý bởi smart contracts và cộng đồng.'
    }
  ]
};

export const QUIZ_NFT_BASIC: Quiz = {
  id: 'quiz-nft-basic',
  title: 'Bài kiểm tra NFT cơ bản',
  description: 'Kiểm tra kiến thức về NFT, ERC-721 và ứng dụng.',
  duration: 12,
  passingScore: 70,
  questions: [
    {
      id: 'q1',
      question: 'NFT là viết tắt của gì?',
      type: 'multiple-choice',
      options: [
        'Non-Fungible Token',
        'New Financial Technology',
        'Network File Transfer',
        'Next Generation Token'
      ],
      correctAnswer: 0,
      explanation: 'NFT (Non-Fungible Token) là token không thể thay thế, mỗi token là duy nhất.'
    },
    {
      id: 'q2',
      question: 'NFT có thể đại diện cho tài sản nào?',
      type: 'multiple-answer',
      options: [
        'Nghệ thuật số',
        'Bất động sản',
        'Vé sự kiện',
        'Tất cả đáp án trên'
      ],
      correctAnswer: [0, 1, 2],
      explanation: 'NFT có thể đại diện cho bất kỳ tài sản duy nhất nào: nghệ thuật, bất động sản, vé...'
    },
    {
      id: 'q3',
      question: 'ERC-721 là gì?',
      type: 'multiple-choice',
      options: [
        'Standard cho NFT trên Ethereum',
        'Standard cho token thường',
        'Loại blockchain mới',
        'Protocol layer 2'
      ],
      correctAnswer: 0,
      explanation: 'ERC-721 là standard chuẩn cho NFTs trên Ethereum blockchain.'
    },
    {
      id: 'q4',
      question: 'Minting NFT có nghĩa là gì?',
      type: 'multiple-choice',
      options: [
        'Tạo NFT mới trên blockchain',
        'Mua NFT',
        'Bán NFT',
        'Xóa NFT'
      ],
      correctAnswer: 0,
      explanation: 'Minting là quá trình tạo NFT mới và ghi lên blockchain.'
    },
    {
      id: 'q5',
      question: 'Metadata của NFT thường lưu ở đâu?',
      type: 'multiple-choice',
      options: [
        'IPFS hoặc Arweave',
        'Trên blockchain',
        'Server trung tâm',
        'Local computer'
      ],
      correctAnswer: 0,
      explanation: 'Metadata thường được lưu trên IPFS hoặc Arweave để tiết kiệm gas và đảm bảo tính phi tập trung.'
    },
    {
      id: 'q6',
      question: 'NFT có thể bị sao chép?',
      type: 'true-false',
      options: ['Đúng', 'Sai'],
      correctAnswer: 1,
      explanation: 'Mặc dù hình ảnh có thể copy, nhưng quyền sở hữu NFT trên blockchain là duy nhất và không thể sao chép.'
    }
  ]
};

// ============================================
// ALL QUIZZES EXPORT
// ============================================

export const ALL_QUIZZES: { [key: string]: Quiz } = {
  'quiz-blockchain-basic': QUIZ_BLOCKCHAIN_BASIC,
  'quiz-blockchain-advanced': QUIZ_BLOCKCHAIN_ADVANCED,
  'quiz-smart-contract-basic': QUIZ_SMART_CONTRACT_BASIC,
  'quiz-solidity-advanced': QUIZ_SOLIDITY_ADVANCED,
  'quiz-web3-basic': QUIZ_WEB3_BASIC,
  'quiz-nft-basic': QUIZ_NFT_BASIC
};

// Helper function to get quiz by ID
export function getQuizById(quizId: string): Quiz | undefined {
  return ALL_QUIZZES[quizId];
}

// Helper function to get all quizzes
export function getAllQuizzes(): Quiz[] {
  return Object.values(ALL_QUIZZES);
}

// Helper function to get quizzes by category
export function getQuizzesByCategory(category: 'blockchain' | 'smart-contract' | 'web3' | 'nft'): Quiz[] {
  const categoryMap: { [key: string]: string[] } = {
    blockchain: ['quiz-blockchain-basic', 'quiz-blockchain-advanced'],
    'smart-contract': ['quiz-smart-contract-basic', 'quiz-solidity-advanced'],
    web3: ['quiz-web3-basic'],
    nft: ['quiz-nft-basic']
  };

  return categoryMap[category]?.map(id => ALL_QUIZZES[id]).filter(Boolean) || [];
}