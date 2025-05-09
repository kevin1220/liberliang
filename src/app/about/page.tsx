export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">关于我</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          欢迎来到我的个人网站！我是一名热爱技术的开发者，专注于 AI 技术的研究与应用。
        </p>
        <p className="mb-4">
          在这里，我会分享：
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>最新的 AI 技术动态</li>
          <li>个人项目经验</li>
          <li>技术学习心得</li>
          <li>编程开发技巧</li>
        </ul>
        <p>
          希望通过这个网站，能与大家一起探讨技术，共同进步！
        </p>
      </div>
    </div>
  );
}