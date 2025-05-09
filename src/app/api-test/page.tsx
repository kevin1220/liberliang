"use client";

import { useEffect, useState } from "react";
import { testUnsplashApi } from "@/utils/UnsplashApiTest";

/**
 * 图片API测试页面
 * 用于测试新图库（Lorem Picsum）图片获取与展示功能
 */
export default function ImageApiTestPage() {
  // 测试结果状态
  const [test1Result, setTest1Result] = useState<{
    success: boolean;
    imageUrl?: string;
    error?: any;
    loading: boolean;
  }>({ success: false, loading: true });

  const [test2Result, setTest2Result] = useState<{
    success: boolean;
    imageUrl?: string;
    error?: any;
    loading: boolean;
  }>({ success: false, loading: true });

  // 运行测试
  useEffect(() => {
    const runTests = async () => {
      try {
        // 测试1: 随机图片
        const result1 = await testUnsplashApi();
        setTest1Result({ ...result1, loading: false });
        // 测试2: 多次获取不同图片
        const result2 = await testUnsplashApi();
        setTest2Result({ ...result2, loading: false });
      } catch (error) {
        setTest1Result({ success: false, loading: false, error });
        setTest2Result({ success: false, loading: false, error });
      }
    };
    runTests();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">图片API 测试</h1>
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">测试1: 随机图片</h2>
        {test1Result.loading ? (
          <p>加载中...</p>
        ) : test1Result.success ? (
          <div>
            <p className="text-green-600 mb-2">状态: 成功</p>
            <div className="mt-2">
              <img
                src={test1Result.imageUrl}
                alt="随机图片"
                className="max-w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-red-600 mb-2">状态: 失败</p>
            <pre className="bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(test1Result.error, null, 2)}
            </pre>
          </div>
        )}
      </div>
      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">测试2: 再次获取随机图片</h2>
        {test2Result.loading ? (
          <p>加载中...</p>
        ) : test2Result.success ? (
          <div>
            <p className="text-green-600 mb-2">状态: 成功</p>
            <div className="mt-2">
              <img
                src={test2Result.imageUrl}
                alt="随机图片2"
                className="max-w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-red-600 mb-2">状态: 失败</p>
            <pre className="bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(test2Result.error, null, 2)}
            </pre>
          </div>
        )}
      </div>
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">图片API信息</h2>
        <pre className="bg-gray-100 p-2 rounded overflow-auto">
          {JSON.stringify({
            api: "/api/unsplash (已切换为 Lorem Picsum 代理)",
            example: "https://picsum.photos/800/600?random=1"
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}