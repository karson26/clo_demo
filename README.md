# Product List Application

## 概述

这是一个基于 React + Vite + TypeScript 构建的商品列表应用，实现了商品展示、筛选、排序和懒加载等功能。

## 技术栈

- **React 19** - UI 框架
- **Vite** - 构建工具
- **TypeScript** - 类型安全
- **Immer** - 不可变状态管理
- **SASS** - 样式预处理
- **Jest** - 单元测试

## 项目结构

```
src/
├── components/           # 组件目录
│   ├── ProductFilter.tsx          # 筛选组件
│   ├── PriceSlider.tsx            # 价格范围滑块
│   ├── SearchIcon.tsx            # 搜索图标
│   └── productlist/             # 商品列表相关组件
│       ├── ProductList.tsx        # 商品列表主组件
│       ├── ProductItem.tsx        # 商品卡片
│       └── ProductSkeleton.tsx    # 骨架屏
├── pages/               # 页面目录
│   └── Home.tsx                 # 首页
├── store/               # 状态管理
│   ├── index.tsx                # Context Provider
│   ├── reducer.ts               # Reducer 逻辑
│   └── types.ts                # 类型定义
├── style/               # 样式文件
│   ├── App.scss                 # 主样式
│   └── PriceSlider.scss         # 滑块样式
├── utils/               # 工具函数
│   └── utils.ts                # 排序等工具函数
├── main.tsx             # 应用入口
└── css.d.ts             # CSS 类型声明
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

### 运行测试

```bash
npm test
```

## 功能说明

### 商品列表

- 从 API 获取商品数据
- 支持懒加载（IntersectionObserver）
- 响应式网格布局（桌面 4 列，<1200px 3 列）
- Skeleton 加载状态

### 筛选功能

- **价格选项**：Paid、Free、View Only 复选框筛选
- **搜索**：按商品名称搜索
- **价格范围**：双滑块选择价格区间

### 排序功能

- Item Name（名称升序）
- High Price（价格降序，FREE 和 VIEW_ONLY 排在最后）
- Low Price（价格升序）

### URL 同步

- 筛选条件和搜索词会同步到 URL 参数
- 支持浏览器前进/后退按钮
- 价格范围不存储在 URL 中

## 状态管理

使用 `useReducer` + Context API 进行状态管理：

```typescript
interface AppState {
  product: {
    allData: Product[]
    showData: Product[]
    pageSize: number
    loading: boolean
  }
  filter: {
    selectedFilters: number[]
    selectedSort: string
    searchTerm: string
    priceRange: [number, number]
  }
}
```

### 可用 Actions

- `SET_ALL_DATA` - 设置所有商品数据
- `SET_LOADING` - 设置加载状态
- `SET_FILTERS` - 设置筛选条件
- `SET_SEARCH_TERM` - 设置搜索词
- `SET_PRICE_RANGE` - 设置价格范围
- `SET_SORT` - 设置排序方式

## API

### 商品数据接口

```typescript
interface Product {
  id: string
  creator: string
  title: string
  pricingOption: number  // 0: PAID, 1: FREE, 2: VIEW_ONLY
  imagePath: string
  price: number
}
```

### API 端点

```
GET https://closet-recruiting-api.azurewebsites.net/api/data
```

## 组件使用示例

### ProductFilter

```tsx
import ProductFilter from './components/ProductFilter'

<ProductFilter />
```

### ProductList

```tsx
import ProductList from './components/productlist/ProductList'

<ProductList />
```

### PriceSlider

```tsx
import PriceSlider from './components/PriceSlider'

<PriceSlider 
  priceRange={[0, 1000]} 
  onPriceRangeChange={(range) => console.log(range)} 
/>
```

## 样式定制

项目使用 SASS 变量定义主题：

```scss
$bg-color: #19191e
$card-bg: #0f0f14
$input-bg: #222222
$text-color: #ffffff
$border-color: #444444
$placeholder-color: #888888
```

## 测试

项目包含以下测试：

- **Reducer 测试** - 验证状态管理逻辑
- **ProductFilter 测试** - 验证筛选组件交互
- **ProductItem 测试** - 验证商品卡片渲染

运行测试：

```bash
npm test
```

查看测试覆盖率：

```bash
npm test -- --coverage
```

## 配置说明

### Vite 配置

- 开发服务器端口：3000
- React 插件已配置

### TypeScript 配置

- 目标：ES2020
- 模块：ESNext
- JSX：react-jsx
- 严格模式已启用

### Jest 配置

- 测试环境：jsdom
- 支持 TypeScript 和 JSX
- CSS/SCSS 模块已 mock
