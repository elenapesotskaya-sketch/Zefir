# Shopping Cart & WhatsApp Order System

## Overview
A complete client-side shopping cart with WhatsApp integration for order submission. All data persists in localStorage.

## Features Implemented

### 1. Add to Cart Button
- "Добавить в корзину" button on each product card (view mode only)
- Button disabled for out-of-stock products
- Visual feedback when item added (button changes to green with "Добавлено в корзину")

### 2. Cart State Management (useCart Hook)
- Stored in localStorage under key `cart-data`
- Functions: `addItem()`, `removeItem()`, `updateQuantity()`, `clearCart()`, `getTotalPrice()`, `getItemCount()`
- Each cart item: `{ id, name, price, quantity }`
- Automatically persists changes to localStorage

### 3. Cart Icon in Header
- Shopping cart icon in desktop navigation menu
- Badge shows item count (red with white number)
- Also available on mobile menu
- Clicking opens cart modal

### 4. Cart Modal
- Opens as overlay modal (not a new page)
- Shows list of cart items with:
  - Product name, price, quantity
  - +/- buttons to adjust quantity
  - Remove (X) button to delete item
  - Total price calculation
- Order form with required fields:
  - **Телефон** (phone) - required
  - **Дата доставки** (delivery date) - required, min date is today + 3 days
  - **Комментарий к заказу** (comment) - optional
- Validation errors displayed in Russian
- Delivery date helper text: "Доставка возможна не ранее чем через 3 дня"

### 5. Order Submission
- Order number format: `YYYYMMDD-HHMM-RND` (e.g., 20260420-1435-482)
- Validation: cart not empty, phone filled, delivery date selected
- Formatted message includes:
  - Order number
  - List of products with quantities and prices
  - Total price
  - Delivery date
  - Phone number
  - Comment (if provided)
- Button shows loading state with spinner during submission
- Displays: "Переходим в WhatsApp для отправки заказа"
- Opens WhatsApp via `https://wa.me/4917684135318?text={encoded_message}`
- Clears cart after successful submission

## Component Structure

### `/hooks/useCart.ts`
Custom React hook managing cart state with localStorage persistence.

### `/components/CartModal.tsx`
Full cart interface with product management and order submission form.

### `/components/ProductCard.tsx` (Updated)
Added "Добавить в корзину" button and cart integration.

### `/app/page.tsx` (Updated)
- Added cart icon to header (desktop & mobile)
- Integrated CartModal component
- Cart item count badge display

## Usage Flow

1. User browses catalog
2. Clicks "Добавить в корзину" on product
3. Product added to cart (quantity increases if already in cart)
4. Clicks cart icon in header to open modal
5. Adjusts quantities or removes items
6. Fills in phone, delivery date, optional comment
7. Submits order
8. WhatsApp opens with pre-filled message
9. Cart clears after submission

## Design Notes

- Matches existing soft pink bouquet style
- Mobile-responsive design
- Uses existing UI components and Tailwind classes
- Cart persists across page reloads
- No backend/API calls - fully client-side
- No modifications to existing catalog or product structure
