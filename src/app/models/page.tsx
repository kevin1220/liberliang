export default function ModelsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">AI 模型</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          这里将介绍各种 AI 模型的特点、应用场景和最新进展。
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">模型分类</h2>
          <ul className="list-disc pl-6">
            <li>大语言模型（LLM）</li>
            <li>图像生成模型</li>
            <li>语音识别模型</li>
            <li>多模态模型</li>
          </ul>
        </div>
        <p>
          更多模型解析和评测即将更新...
        </p>
      </div>
    </div>
  );
}