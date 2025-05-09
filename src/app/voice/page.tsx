export default function VoicePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">语音技术</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          这里将展示语音相关的技术内容和应用。
        </p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">主要内容</h2>
          <ul className="list-disc pl-6">
            <li>语音识别技术</li>
            <li>语音合成应用</li>
            <li>声音克隆研究</li>
            <li>语音处理工具</li>
          </ul>
        </div>
        <p>
          更多语音技术内容即将更新...
        </p>
      </div>
    </div>
  );
}