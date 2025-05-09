import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 配置图片处理 */
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'picsum.photos'], // 允许的图片域名
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // 允许所有HTTPS图片
      },
    ],
    dangerouslyAllowSVG: true, // 允许SVG图片
    contentDispositionType: 'attachment', // 安全设置
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // 安全设置
    // 图片缓存设置
    minimumCacheTTL: 60 * 60 * 24 * 7, // 缓存7天
    formats: ['image/webp'], // 优先使用WebP格式
  },
  // 启用响应缓存
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // 增加服务器操作的请求体大小限制
    },
  },
  // 配置缓存策略
  onDemandEntries: {
    // 页面保持缓存的时长（毫秒）
    maxInactiveAge: 60 * 60 * 1000, // 1小时
    // 同时缓存的页面数量
    pagesBufferLength: 5,
  },
};

export default nextConfig;
