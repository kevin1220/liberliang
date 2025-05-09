/**
 * 数据模型文件
 * 包含网站各模块的mock数据
 */

/**
 * LLM文章数据模型
 */
export interface LLMArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl?: string;
  url: string;
}

/**
 * 编程技术文章数据模型
 */
export interface CodingArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  language: string;
  tags: string[];
  imageUrl?: string;
  url: string;
}

/**
 * 项目数据模型
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  date: string;
}

/**
 * 音频文章数据模型
 */
export interface AudioArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  duration?: string;
  imageUrl?: string;
  url: string;
}

/**
 * 视频文章数据模型
 */
export interface VideoArticle {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  duration?: string;
  thumbnailUrl?: string;
  url: string;
}

/**
 * 音频技术文章mock数据
 * 包含15条关于音频技术的文章数据
 */
export const audioArticles: AudioArticle[] = [
  {
    id: "audio-1",
    title: "AI语音合成技术最新进展",
    description: "探索当前AI语音合成领域的最新技术突破和应用场景。",
    date: "2024-05-05",
    category: "语音合成",
    duration: "15分钟",
    imageUrl: "https://picsum.photos/seed/audio-1/800/600",
    url: "/audio/ai-voice-synthesis"
  },
  {
    id: "audio-2",
    title: "音频信号处理基础教程",
    description: "从零开始学习音频信号处理的基本原理和实践技巧。",
    date: "2024-05-01",
    category: "信号处理",
    duration: "20分钟",
    imageUrl: "https://picsum.photos/seed/audio-2/800/600",
    url: "/audio/signal-processing-basics"
  },
  {
    id: "audio-3",
    title: "使用深度学习进行音乐生成",
    description: "如何利用深度学习模型创作原创音乐作品。",
    date: "2024-04-28",
    category: "音乐生成",
    duration: "18分钟",
    imageUrl: "https://picsum.photos/seed/audio-3/800/600",
    url: "/audio/deep-learning-music-generation"
  },
  {
    id: "audio-4",
    title: "音频降噪算法比较",
    description: "详细对比各种音频降噪算法的性能和适用场景。",
    date: "2024-04-22",
    category: "降噪技术",
    duration: "12分钟",
    imageUrl: "https://picsum.photos/seed/audio-4/800/600",
    url: "/audio/noise-reduction-algorithms"
  },
  {
    id: "audio-5",
    title: "播客制作完全指南",
    description: "从设备选择到后期制作，全面解析高质量播客的制作流程。",
    date: "2024-04-18",
    category: "内容创作",
    duration: "25分钟",
    imageUrl: "https://picsum.photos/seed/audio-5/800/600",
    url: "/audio/podcast-production-guide"
  },
  {
    id: "audio-6",
    title: "空间音频技术解析",
    description: "探索3D音频和空间音效技术在VR/AR中的应用。",
    date: "2024-04-15",
    category: "空间音频",
    duration: "16分钟",
    imageUrl: "https://picsum.photos/seed/audio-6/800/600",
    url: "/audio/spatial-audio-technology"
  },
  {
    id: "audio-7",
    title: "音频编解码器对比分析",
    description: "详细比较MP3、AAC、FLAC等音频编解码器的特点和性能。",
    date: "2024-04-10",
    category: "编解码技术",
    duration: "14分钟",
    imageUrl: "https://picsum.photos/seed/audio-7/800/600",
    url: "/audio/audio-codecs-comparison"
  },
  {
    id: "audio-8",
    title: "音频指纹识别技术",
    description: "深入了解Shazam等应用背后的音频指纹识别算法原理。",
    date: "2024-04-05",
    category: "音频识别",
    duration: "17分钟",
    imageUrl: "https://picsum.photos/seed/audio-8/800/600",
    url: "/audio/audio-fingerprinting-technology"
  },
  {
    id: "audio-9",
    title: "实时音频处理系统设计",
    description: "如何设计低延迟的实时音频处理系统架构。",
    date: "2024-03-30",
    category: "系统设计",
    duration: "19分钟",
    imageUrl: "https://picsum.photos/seed/audio-9/800/600",
    url: "/audio/realtime-audio-processing"
  },
  {
    id: "audio-10",
    title: "音频数据增强技术",
    description: "使用数据增强技术提升音频机器学习模型的性能。",
    date: "2024-03-25",
    category: "机器学习",
    duration: "13分钟",
    imageUrl: "https://picsum.photos/seed/audio-10/800/600",
    url: "/audio/audio-data-augmentation"
  },
  {
    id: "audio-11",
    title: "音频可视化技术与实现",
    description: "探索音频频谱、波形等可视化技术的实现方法。",
    date: "2024-03-20",
    category: "可视化",
    duration: "15分钟",
    imageUrl: "https://picsum.photos/seed/audio-11/800/600",
    url: "/audio/audio-visualization-techniques"
  },
  {
    id: "audio-12",
    title: "语音识别系统评测方法",
    description: "如何科学评估语音识别系统的性能和准确率。",
    date: "2024-03-15",
    category: "语音识别",
    duration: "16分钟",
    imageUrl: "https://picsum.photos/seed/audio-12/800/600",
    url: "/audio/speech-recognition-evaluation"
  },
  {
    id: "audio-13",
    title: "音频压缩感知原理",
    description: "探索人类听觉系统的感知特性及其在音频压缩中的应用。",
    date: "2024-03-10",
    category: "听觉感知",
    duration: "18分钟",
    imageUrl: "https://source.unsplash.com/random/800x600/?hearing,perception",
    url: "/audio/audio-perception-compression"
  },
  {
    id: "audio-14",
    title: "音频内容审核技术",
    description: "自动检测和过滤音频内容中的不良信息技术方案。",
    date: "2024-03-05",
    category: "内容审核",
    duration: "14分钟",
    imageUrl: "https://source.unsplash.com/random/800x600/?moderation,filter",
    url: "/audio/audio-content-moderation"
  },
  {
    id: "audio-15",
    title: "音频超分辨率技术",
    description: "使用AI技术提升低质量音频的分辨率和清晰度。",
    date: "2024-03-01",
    category: "音频增强",
    duration: "17分钟",
    imageUrl: "https://source.unsplash.com/random/800x600/?enhancement,clarity",
    url: "/audio/audio-super-resolution"
  }
];

/**
 * 视频技术文章mock数据
 * 包含15条关于视频技术的文章数据
 */
export const videoArticles: VideoArticle[] = [
  {
    id: "video-1",
    title: "AI视频生成技术最新进展",
    description: "探索当前AI视频生成领域的最新技术突破和应用场景。",
    date: "2024-05-06",
    category: "视频生成",
    duration: "18分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?ai,video",
    url: "/video/ai-video-generation"
  },
  {
    id: "video-2",
    title: "视频编码标准H.266详解",
    description: "深入解析最新视频编码标准H.266/VVC的技术特点和优势。",
    date: "2024-05-02",
    category: "编码技术",
    duration: "20分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?coding,video",
    url: "/video/h266-explained"
  },
  {
    id: "video-3",
    title: "实时视频处理技术与应用",
    description: "探讨实时视频处理的关键技术和典型应用场景。",
    date: "2024-04-27",
    category: "实时处理",
    duration: "16分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?realtime,processing",
    url: "/video/realtime-video-processing"
  },
  {
    id: "video-4",
    title: "视频超分辨率技术对比",
    description: "对比分析各种视频超分辨率算法的性能和效果。",
    date: "2024-04-23",
    category: "超分辨率",
    duration: "15分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?resolution,clarity",
    url: "/video/video-super-resolution"
  },
  {
    id: "video-5",
    title: "视频内容分析与理解",
    description: "探索AI如何理解和分析视频内容的语义信息。",
    date: "2024-04-19",
    category: "内容分析",
    duration: "19分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?analysis,content",
    url: "/video/video-content-analysis"
  },
  {
    id: "video-6",
    title: "视频压缩感知原理",
    description: "探索人类视觉系统的感知特性及其在视频压缩中的应用。",
    date: "2024-04-14",
    category: "视觉感知",
    duration: "17分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?vision,perception",
    url: "/video/video-perception-compression"
  },
  {
    id: "video-7",
    title: "视频稳定技术解析",
    description: "深入了解视频防抖和稳定技术的原理与实现。",
    date: "2024-04-09",
    category: "视频稳定",
    duration: "14分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?stabilization,camera",
    url: "/video/video-stabilization-techniques"
  },
  {
    id: "video-8",
    title: "视频对象跟踪算法",
    description: "解析视频对象跟踪的经典算法和最新进展。",
    date: "2024-04-04",
    category: "对象跟踪",
    duration: "18分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?tracking,object",
    url: "/video/video-object-tracking"
  },
  {
    id: "video-9",
    title: "视频特效制作技术",
    description: "探索电影和视频制作中的视觉特效技术原理。",
    date: "2024-03-29",
    category: "视觉特效",
    duration: "22分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?effects,cinema",
    url: "/video/video-visual-effects"
  },
  {
    id: "video-10",
    title: "视频流媒体技术详解",
    description: "深入解析视频流媒体传输协议和优化策略。",
    date: "2024-03-24",
    category: "流媒体",
    duration: "19分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?streaming,media",
    url: "/video/video-streaming-technology"
  },
  {
    id: "video-11",
    title: "视频内容审核技术",
    description: "自动检测和过滤视频内容中的不良信息技术方案。",
    date: "2024-03-19",
    category: "内容审核",
    duration: "16分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?moderation,filter",
    url: "/video/video-content-moderation"
  },
  {
    id: "video-12",
    title: "视频编辑软件技术对比",
    description: "对比分析主流视频编辑软件的技术特点和适用场景。",
    date: "2024-03-14",
    category: "视频编辑",
    duration: "21分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?editing,software",
    url: "/video/video-editing-software"
  },
  {
    id: "video-13",
    title: "视频质量评估方法",
    description: "探讨客观和主观视频质量评估的方法和标准。",
    date: "2024-03-09",
    category: "质量评估",
    duration: "15分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?quality,assessment",
    url: "/video/video-quality-assessment"
  },
  {
    id: "video-14",
    title: "视频摘要生成技术",
    description: "自动从长视频中提取关键内容生成摘要技术方案。",
    date: "2024-03-04",
    category: "视频摘要",
    duration: "17分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?summary,extract",
    url: "/video/video-summarization"
  },
  {
    id: "video-15",
    title: "视频增强现实技术",
    description: "探索AR技术在视频内容创作和交互中的应用。",
    date: "2024-02-28",
    category: "增强现实",
    duration: "20分钟",
    thumbnailUrl: "https://source.unsplash.com/random/800x600/?augmented,reality",
    url: "/video/video-augmented-reality"
  }
]

/**
 * LLM技术文章mock数据
 * 包含12条关于大语言模型的文章数据
 */
/**
 * LLM文章数据
 * 使用本地API路由代理Unsplash请求
 */
export const llmArticles: LLMArticle[] = [
  {
    id: "llm-1",
    title: "GPT-4架构深度解析",
    description: "深入探讨GPT-4的内部架构、训练方法和性能优化技术。",
    date: "2024-05-05",
    category: "模型原理",
    imageUrl: "https://picsum.photos/800/600?random=1",
    url: "/llm/gpt4-architecture"
  },
  {
    id: "llm-2",
    title: "提示工程高级技巧",
    description: "掌握提示工程的核心原则，提高LLM输出质量的实用方法。",
    date: "2024-04-28",
    category: "提示工程",
    imageUrl: "https://picsum.photos/800/600?random=2",
    url: "/llm/advanced-prompt-engineering"
  },
  {
    id: "llm-3",
    title: "LLM微调最佳实践",
    description: "如何有效地对大语言模型进行微调，以适应特定领域任务。",
    date: "2024-04-22",
    category: "模型训练",
    imageUrl: "https://picsum.photos/800/600?random=3",
    url: "/llm/fine-tuning-best-practices"
  },
  {
    id: "llm-4",
    title: "构建基于LLM的聊天机器人",
    description: "从零开始构建一个智能聊天机器人，包括前后端实现和部署。",
    date: "2024-04-15",
    category: "应用开发",
    imageUrl: "https://picsum.photos/800/600?random=4",
    url: "/llm/building-llm-chatbot"
  },
  {
    id: "llm-5",
    title: "LLM在医疗领域的应用",
    description: "探讨大语言模型如何革新医疗诊断、病历分析和医学研究。",
    date: "2024-04-10",
    category: "行业应用",
    imageUrl: "https://picsum.photos/800/600?random=5",
    url: "/llm/llm-in-healthcare"
  },
  {
    id: "llm-6",
    title: "向量数据库与LLM集成指南",
    description: "如何使用向量数据库增强LLM的知识检索能力。",
    date: "2024-04-05",
    category: "技术集成",
    imageUrl: "https://picsum.photos/800/600?random=6",
    url: "/llm/vector-databases-integration"
  },
  {
    id: "llm-7",
    title: "LLM推理优化技术",
    description: "提高LLM推理速度和降低资源消耗的先进技术。",
    date: "2024-03-28",
    category: "性能优化",
    imageUrl: "https://picsum.photos/800/600?random=7",
    url: "/llm/inference-optimization"
  },
  {
    id: "llm-8",
    title: "多模态LLM发展趋势",
    description: "探索结合文本、图像和音频的下一代多模态大语言模型。",
    date: "2024-03-20",
    category: "前沿研究",
    imageUrl: "https://picsum.photos/800/600?random=8",
    url: "/llm/multimodal-llm-trends"
  },
  {
    id: "llm-9",
    title: "LLM安全与对齐技术",
    description: "确保大语言模型安全可靠的最新对齐方法和安全措施。",
    date: "2024-03-15",
    category: "AI安全",
    imageUrl: "https://picsum.photos/800/600?random=9",
    url: "/llm/safety-and-alignment"
  },
  {
    id: "llm-10",
    title: "开源LLM模型对比分析",
    description: "详细比较Llama、Mistral、Falcon等主流开源大语言模型的性能和特点。",
    date: "2024-03-08",
    category: "模型评估",
    imageUrl: "https://picsum.photos/800/600?random=10",
    url: "/llm/open-source-llm-comparison"
  },
  {
    id: "llm-11",
    title: "LLM与知识图谱结合应用",
    description: "利用知识图谱增强LLM的事实准确性和推理能力。",
    date: "2024-03-01",
    category: "知识增强",
    imageUrl: "https://picsum.photos/800/600?random=11",
    url: "/llm/llm-knowledge-graph"
  },
  {
    id: "llm-12",
    title: "LLM在代码生成中的应用",
    description: "探索大语言模型在自动代码生成和编程辅助中的最新进展。",
    date: "2024-02-25",
    category: "代码生成",
    imageUrl: "https://picsum.photos/800/600?random=12",
    url: "/llm/llm-code-generation"
  }
]

/**
 * 编程技术文章mock数据
 * 包含12条关于编程技术的文章数据
 */
export const codingArticles: CodingArticle[] = [
  {
    id: "coding-1",
    title: "React 18新特性详解",
    description: "深入解析React 18带来的并发渲染、自动批处理和Suspense等新特性。",
    date: "2024-05-02",
    language: "JavaScript",
    tags: ["React", "前端", "Web开发"],
    imageUrl: "https://source.unsplash.com/random/800x600/?react,javascript",
    url: "/coding/react18-features"
  },
  {
    id: "coding-2",
    title: "TypeScript高级类型技巧",
    description: "掌握TypeScript中的映射类型、条件类型和类型推断等高级特性。",
    date: "2024-04-25",
    language: "TypeScript",
    tags: ["TypeScript", "类型系统", "前端"],
    imageUrl: "https://source.unsplash.com/random/800x600/?typescript,code",
    url: "/coding/advanced-typescript"
  },
  {
    id: "coding-3",
    title: "Python异步编程实战",
    description: "使用asyncio和aiohttp构建高性能的异步Python应用。",
    date: "2024-04-18",
    language: "Python",
    tags: ["Python", "异步编程", "后端"],
    imageUrl: "https://source.unsplash.com/random/800x600/?python,programming",
    url: "/coding/python-async-programming"
  },
  {
    id: "coding-4",
    title: "Go语言并发模式详解",
    description: "深入理解Go语言的goroutine、channel和并发模式。",
    date: "2024-04-12",
    language: "Go",
    tags: ["Go", "并发编程", "后端"],
    imageUrl: "https://source.unsplash.com/random/800x600/?golang,concurrency",
    url: "/coding/go-concurrency"
  },
  {
    id: "coding-5",
    title: "Docker容器化最佳实践",
    description: "如何高效使用Docker容器化你的应用，包括多阶段构建和优化技巧。",
    date: "2024-04-05",
    language: "Docker",
    tags: ["Docker", "DevOps", "容器化"],
    imageUrl: "https://source.unsplash.com/random/800x600/?docker,container",
    url: "/coding/docker-best-practices"
  },
  {
    id: "coding-6",
    title: "Rust内存安全机制解析",
    description: "探索Rust的所有权、借用和生命周期如何保证内存安全。",
    date: "2024-03-30",
    language: "Rust",
    tags: ["Rust", "系统编程", "内存安全"],
    imageUrl: "https://source.unsplash.com/random/800x600/?rust,programming",
    url: "/coding/rust-memory-safety"
  },
  {
    id: "coding-7",
    title: "Next.js 14全栈应用开发",
    description: "使用Next.js 14构建现代化全栈Web应用的完整指南。",
    date: "2024-03-22",
    language: "JavaScript",
    tags: ["Next.js", "React", "全栈"],
    imageUrl: "https://source.unsplash.com/random/800x600/?nextjs,fullstack",
    url: "/coding/nextjs-fullstack"
  },
  {
    id: "coding-8",
    title: "GraphQL API设计原则",
    description: "构建高效、可扩展的GraphQL API的设计原则和最佳实践。",
    date: "2024-03-15",
    language: "GraphQL",
    tags: ["GraphQL", "API设计", "后端"],
    imageUrl: "https://source.unsplash.com/random/800x600/?graphql,api",
    url: "/coding/graphql-api-design"
  },
  {
    id: "coding-9",
    title: "Kubernetes集群管理指南",
    description: "从零开始搭建和管理生产级Kubernetes集群的完整指南。",
    date: "2024-03-08",
    language: "Kubernetes",
    tags: ["Kubernetes", "容器编排", "DevOps"],
    imageUrl: "https://source.unsplash.com/random/800x600/?kubernetes,cluster",
    url: "/coding/kubernetes-cluster-management"
  },
  {
    id: "coding-10",
    title: "Swift并发编程新特性",
    description: "探索Swift 5.5引入的async/await和Actor模型等并发特性。",
    date: "2024-03-01",
    language: "Swift",
    tags: ["Swift", "iOS开发", "并发编程"],
    imageUrl: "/images/coding/swift.jpg",
    url: "/coding/swift-concurrency"
  },
  {
    id: "coding-11",
    title: "深度学习框架对比分析",
    description: "详细比较PyTorch、TensorFlow和JAX等主流深度学习框架的优缺点。",
    date: "2024-02-22",
    language: "Python",
    tags: ["深度学习", "AI", "框架对比"],
    imageUrl: "/images/coding/deep-learning.jpg",
    url: "/coding/deep-learning-frameworks"
  },
  {
    id: "coding-12",
    title: "微服务架构设计模式",
    description: "实用的微服务架构设计模式和实现策略。",
    date: "2024-02-15",
    language: "架构",
    tags: ["微服务", "系统设计", "架构模式"],
    imageUrl: "/images/coding/microservices.jpg",
    url: "/coding/microservice-patterns"
  }
];

/**
 * 项目展示mock数据
 * 包含12个项目数据
 */
export const projects: Project[] = [
  {
    id: "project-1",
    title: "AI助手应用",
    description: "基于GPT-4的智能助手应用，支持多轮对话、知识检索和任务自动化。",
    technologies: ["React", "Node.js", "OpenAI API", "MongoDB"],
    imageUrl: "/images/projects/ai-assistant.jpg",
    githubUrl: "https://github.com/username/ai-assistant",
    demoUrl: "https://ai-assistant-demo.com",
    date: "2024-04"
  },
  {
    id: "project-2",
    title: "智能文档分析系统",
    description: "使用机器学习自动提取和分析文档中的关键信息，支持多种文档格式。",
    technologies: ["Python", "TensorFlow", "Flask", "React"],
    imageUrl: "/images/projects/document-analyzer.jpg",
    githubUrl: "https://github.com/username/document-analyzer",
    demoUrl: "https://doc-analyzer.com",
    date: "2024-03"
  },
  {
    id: "project-3",
    title: "区块链投票平台",
    description: "基于以太坊的去中心化投票系统，确保投票过程的透明和不可篡改。",
    technologies: ["Solidity", "Ethereum", "Web3.js", "React"],
    imageUrl: "/images/projects/blockchain-voting.jpg",
    githubUrl: "https://github.com/username/blockchain-voting",
    demoUrl: "https://blockchain-vote.com",
    date: "2024-02"
  },
  {
    id: "project-4",
    title: "实时协作编辑器",
    description: "支持多人实时协作的在线代码和文档编辑器，类似Google Docs。",
    technologies: ["WebSocket", "React", "Node.js", "MongoDB"],
    imageUrl: "/images/projects/collaborative-editor.jpg",
    githubUrl: "https://github.com/username/collaborative-editor",
    demoUrl: "https://collab-edit.com",
    date: "2024-01"
  },
  {
    id: "project-5",
    title: "AR导航应用",
    description: "结合增强现实技术的室内导航应用，提供沉浸式导航体验。",
    technologies: ["ARKit", "Swift", "CoreLocation", "SceneKit"],
    imageUrl: "/images/projects/ar-navigation.jpg",
    githubUrl: "https://github.com/username/ar-navigation",
    demoUrl: "https://ar-nav.com",
    date: "2023-12"
  },
  {
    id: "project-6",
    title: "智能家居控制系统",
    description: "集成多种智能家居设备的统一控制平台，支持语音控制和自动化场景。",
    technologies: ["IoT", "React Native", "Node.js", "MQTT"],
    imageUrl: "/images/projects/smart-home.jpg",
    githubUrl: "https://github.com/username/smart-home-control",
    demoUrl: "https://smart-home-demo.com",
    date: "2023-11"
  },
  {
    id: "project-7",
    title: "健康数据分析平台",
    description: "收集和分析用户健康数据，提供个性化健康建议和趋势分析。",
    technologies: ["Python", "Django", "React", "PostgreSQL", "Data Visualization"],
    imageUrl: "/images/projects/health-analytics.jpg",
    githubUrl: "https://github.com/username/health-analytics",
    demoUrl: "https://health-analytics.com",
    date: "2023-10"
  },
  {
    id: "project-8",
    title: "自动化测试框架",
    description: "高效的端到端测试框架，支持Web和移动应用的自动化测试。",
    technologies: ["Cypress", "Selenium", "JavaScript", "Docker"],
    imageUrl: "/images/projects/test-automation.jpg",
    githubUrl: "https://github.com/username/test-automation",
    demoUrl: "https://test-auto-demo.com",
    date: "2023-09"
  },
  {
    id: "project-9",
    title: "多语言翻译API",
    description: "基于神经网络的多语言翻译API，支持100+种语言的实时翻译。",
    technologies: ["Python", "PyTorch", "FastAPI", "Docker"],
    imageUrl: "/images/projects/translation-api.jpg",
    githubUrl: "https://github.com/username/translation-api",
    demoUrl: "https://translate-api.com",
    date: "2023-08"
  },
  {
    id: "project-10",
    title: "电子商务平台",
    description: "功能完善的电子商务平台，包括商品管理、购物车、支付和订单跟踪。",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe API"],
    imageUrl: "/images/projects/ecommerce.jpg",
    githubUrl: "https://github.com/username/ecommerce-platform",
    demoUrl: "https://ecommerce-demo.com",
    date: "2023-07"
  },
  {
    id: "project-11",
    title: "音乐推荐系统",
    description: "基于用户听歌习惯的个性化音乐推荐系统，使用协同过滤和深度学习算法。",
    technologies: ["Python", "TensorFlow", "Flask", "Vue.js", "PostgreSQL"],
    imageUrl: "/images/projects/music-recommendation.jpg",
    githubUrl: "https://github.com/username/music-recommendation",
    demoUrl: "https://music-recommend.com",
    date: "2023-06"
  },
  {
    id: "project-12",
    title: "社交媒体分析工具",
    description: "分析社交媒体数据的工具，提供情感分析、趋势识别和用户行为分析。",
    technologies: ["Python", "NLP", "React", "D3.js", "MongoDB"],
    imageUrl: "/images/projects/social-media-analytics.jpg",
    githubUrl: "https://github.com/username/social-analytics",
    demoUrl: "https://social-analytics.com",
    date: "2023-05"
  }
];