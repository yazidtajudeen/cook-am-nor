# 🍳 CookFlow - Your Fun Cooking Adventure!

A **beautiful, interactive, and fun** cooking tutorial application with step-by-step guidance, animations, confetti celebrations, and user progress tracking!

## ✨ New Features (Enhanced Version)

### 🎨 **Visual Enhancements**
- ✅ **Animated Welcome Screen** - Floating cooking pot with steam bubbles
- ✅ **Bouncing Title Animation** - Words animate in one by one
- ✅ **Confetti Celebrations** - Colorful confetti when you complete recipes!
- ✅ **Trophy Animation** - Spinning trophy on completion screen
- ✅ **Gradient Backgrounds** - Beautiful warm orange/peach gradients
- ✅ **Hover Effects** - Cards lift and glow when you hover
- ✅ **Pulse Animations** - Buttons pulse to draw attention
- ✅ **Smooth Transitions** - Everything animates smoothly

### 🎮 **Interactive Features**
- ✅ **Enter Key Support** - Press Enter to submit your name
- ✅ **Previous Step Button** - Go back to review previous steps
- ✅ **Dynamic Next Button** - Changes to "Complete Recipe!" on last step
- ✅ **Step Number Badge** - Visual badge showing current step number
- ✅ **Clickable Ingredients** - Check off ingredients as you use them
- ✅ **Interactive Timer** - Start, pause, and reset with visual feedback
- ✅ **Mood Cards** - Animated cards that react to hover and selection
- ✅ **Recipe Cards** - Cards scale and glow when selected
- ✅ **Toast Notifications** - Fun notifications for actions
- ✅ **Dashboard Quick Access** - Jump to dashboard from tutorial

### 📊 **User Experience**
- ✅ **User Tracking** - Tracks every user and their completed recipes
- ✅ **Streak System** - Build cooking streaks day by day
- ✅ **Achievement System** - Unlock achievements as you cook
- ✅ **Recipe History** - View all your completed recipes with dates
- ✅ **Progress Tracking** - Visual progress bar and percentage
- ✅ **Persistent Data** - All data saved in localStorage

### 🎯 **Design Improvements**
- ✅ **Modern UI** - Clean, contemporary design
- ✅ **Better Typography** - Poppins for headings, Inter for body
- ✅ **Improved Spacing** - Better visual hierarchy
- ✅ **Enhanced Colors** - Warm, inviting color palette
- ✅ **Better Shadows** - Depth and dimension throughout
- ✅ **Responsive Layout** - Works on all screen sizes

## 🚀 How to Run

1. **Navigate to the folder:**
   ```bash
   cd /Users/student/Documents/ZID/cookflow-redesign
   ```

2. **Start the server:**
   ```bash
   python3 -m http.server 8080
   ```

3. **Open in browser:**
   ```
   http://localhost:8080
   ```

## 🎯 User Flow

1. **Welcome Screen** 
   - Animated cooking pot with steam
   - Enter your chef name
   - Press Enter or click "Let's Cook!"

2. **Mood Selection**
   - Choose from 4 moods (Sweet, Comfort, Quick, Healthy)
   - Cards animate on hover
   - Recipe grid appears when mood selected

3. **Recipe Selection**
   - Browse filtered recipes
   - Cards glow when selected
   - Click "Start Cooking Adventure!"

4. **Recipe Overview**
   - Beautiful hero image
   - Recipe stats (time, steps, difficulty)
   - Click "Start Tutorial Now!"

5. **Step-by-Step Tutorial**
   - Large step images with number badges
   - Detailed instructions
   - Interactive timer widget
   - Ingredient checklist
   - Previous/Next navigation
   - Progress bar at top
   - Quick dashboard access

6. **Completion Screen**
   - 🎉 **CONFETTI CELEBRATION!**
   - Trophy animation
   - Recipe summary
   - Achievement unlocked banner
   - View Dashboard or Cook Another

7. **Dashboard**
   - Your cooking stats
   - Streak counter with fire icon
   - Recipe history grid
   - Beautiful stat cards

## 🍽️ Recipes Included

All recipes have **5-6 detailed steps** with real food photography:

- **Perfect Chocolate Chip Cookies** (6 steps) - Sweet Treats
- **Creamy Tomato Pasta** (5 steps) - Comfort Food
- **Avocado Toast Deluxe** (5 steps) - Quick Bites
- **Berry Smoothie Bowl** (5 steps) - Healthy

## 🎨 Design Features

### Color Palette
- **Primary Orange:** `#E67E22`
- **Orange Light:** `#F39C12`
- **Orange Dark:** `#D35400`
- **Cream:** `#FFF5E6`
- **Beige:** `#F5E6D3`
- **Light Orange:** `#FFE5CC`

### Animations
- **Floating:** Cooking pot floats up and down
- **Bubbles:** Steam bubbles rise and fade
- **Word Bounce:** Title words bounce in
- **Scale In:** Cards scale in on load
- **Slide Up:** Content slides up smoothly
- **Pulse:** Buttons pulse continuously
- **Trophy Bounce:** Trophy spins and bounces
- **Confetti Fall:** Colorful confetti falls

### Interactive Elements
- **Hover Transforms:** Cards lift on hover
- **Active States:** Selected items glow
- **Smooth Transitions:** 300ms cubic-bezier
- **Shadow Depth:** Multiple shadow layers
- **Gradient Overlays:** Subtle gradient effects

## 💾 Data Persistence

All data stored in `localStorage`:

```javascript
{
  "userName": {
    "name": "Chef Name",
    "recipes": [
      {
        "recipeId": 1,
        "recipeName": "Perfect Chocolate Chip Cookies",
        "recipeImage": "...",
        "completedAt": "2026-01-09T14:00:00.000Z",
        "timeSpent": 2700,
        "steps": 6
      }
    ],
    "totalRecipes": 1,
    "streak": 1,
    "lastCookDate": "Wed Jan 09 2026"
  }
}
```

## 🛠️ Technologies

- **Pure HTML5, CSS3, JavaScript** - No frameworks!
- **SVG Icons** - Crisp vector graphics
- **Unsplash Images** - High-quality food photography
- **LocalStorage API** - Data persistence
- **CSS Animations** - Smooth, performant animations
- **CSS Grid & Flexbox** - Modern layouts
- **Custom Properties** - CSS variables for theming

## 🎮 Interactive Features Explained

### Confetti System
Triggers on recipe completion with 3 waves of confetti in brand colors.

### Notification System
Toast notifications appear for:
- Welcome message
- Step changes
- Recipe completion

### Timer System
- Displays suggested time for each step
- Start/Pause/Reset controls
- Large, easy-to-read display
- Auto-resets between steps

### Ingredient Checklist
- Click to check off ingredients
- Visual checkmark animation
- Strike-through text when checked
- Smooth hover effects

### Navigation
- Previous step button (hidden on first step)
- Next step button (changes to "Complete!" on last step)
- Back buttons on all screens
- Dashboard quick access

## 📱 Responsive Design

- **Desktop:** Full grid layouts with sidebars
- **Tablet:** Adjusted grid columns
- **Mobile:** Single column, stacked layouts

## 🎉 Fun Details

- Cooking pot floats and has animated steam
- Title words bounce in sequentially
- Mood cards rotate slightly on hover
- Recipe cards scale and glow when selected
- Step number badge is prominent
- Trophy spins when recipe completed
- Confetti in brand colors
- Pulse animation on main CTA buttons
- Smooth page transitions
- Interactive ingredient checkboxes
- Fire icon for streak counter

## 🚀 Performance

- **No dependencies** - Vanilla JavaScript only
- **Optimized animations** - CSS transforms and opacity
- **Lazy loading** - Images load as needed
- **Efficient DOM updates** - Minimal reflows
- **LocalStorage** - Fast data access

## 🎨 Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- High contrast ratios
- Focus states on interactive elements
- Clear visual feedback

---

**Enjoy your cooking adventure! 🍳✨**

Made with ❤️ and lots of confetti 🎉
