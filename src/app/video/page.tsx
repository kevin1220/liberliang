export default function VideoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">视频内容</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-4">
          这里将会展示一些技术相关的视频内容。
        </p>
        <div className="grid gap-6">
          {/* 视频内容将在这里添加 */}
          <div className="p-4 border rounded-lg dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-2">即将更新</h2>
            <p className="text-gray-600 dark:text-gray-400">
              视频内容正在准备中，敬请期待...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}