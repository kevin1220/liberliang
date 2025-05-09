export default function LLMPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">LLM 技术</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          这里将会分享大语言模型（LLM）相关的技术内容和研究心得。
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">主要内容</h2>
          <ul className="list-disc pl-6">
            <li>LLM 模型解析</li>
            <li>提示工程（Prompt Engineering）技巧</li>
            <li>LLM 应用开发实践</li>
            <li>最新 LLM 研究动态</li>
          </ul>
        </div>
        <p>
          持续更新中，敬请关注...
        </p>
      </div>
    </div>
  );
}