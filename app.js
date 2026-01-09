// ========================================
// STATE MANAGEMENT
// ========================================

const appState = {
    currentScreen: 'welcomeScreen',
    userName: '',
    selectedMood: null,
    selectedRecipe: null,
    currentStep: 0,
    timerInterval: null,
    timerSeconds: 0,
    recipeStartTime: null,
    users: JSON.parse(localStorage.getItem('cookam_users') || '{}'),
    favorites: JSON.parse(localStorage.getItem('cookam_favorites') || '[]'),
    ratings: JSON.parse(localStorage.getItem('cookam_ratings') || '{}'),
    dailyChallenge: JSON.parse(localStorage.getItem('cookam_daily_challenge') || 'null')
};

// Gamification levels
const LEVELS = [
    { level: 1, title: 'Beginner Chef', minXP: 0, maxXP: 199, color: '#4CAF50' },
    { level: 2, title: 'Home Cook', minXP: 200, maxXP: 499, color: '#2196F3' },
    { level: 3, title: 'Skilled Chef', minXP: 500, maxXP: 999, color: '#FF9800' },
    { level: 4, title: 'Expert Chef', minXP: 1000, maxXP: 1999, color: '#E67E22' },
    { level: 5, title: 'Master Chef', minXP: 2000, maxXP: Infinity, color: '#9C27B0' }
];

const ACHIEVEMENTS = [
    { id: 'first_recipe', name: 'First Steps', description: 'Complete your first recipe', icon: '🎯', xp: 50 },
    { id: 'five_recipes', name: 'Getting Started', description: 'Complete 5 recipes', icon: '🌟', xp: 100 },
    { id: 'ten_recipes', name: 'Recipe Master', description: 'Complete 10 recipes', icon: '👨‍🍳', xp: 200 },
    { id: 'week_streak', name: 'Streak Master', description: '7-day cooking streak', icon: '🔥', xp: 150 },
    { id: 'all_categories', name: 'Explorer', description: 'Try all recipe categories', icon: '🗺️', xp: 250 },
    { id: 'speed_demon', name: 'Speed Demon', description: 'Complete a recipe in under 15 min', icon: '⚡', xp: 100 },
    { id: 'perfectionist', name: 'Perfectionist', description: 'Check all ingredients in a recipe', icon: '✨', xp: 75 }
];

// ========================================
// RECIPE DATA
// ========================================

const recipes = [
    {
        id: 1,
        title: "Perfect Chocolate Chip Cookies",
        mood: "sweet",
        time: "45 min",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&q=80",
        steps: [
            {
                title: "Preheat and Prep",
                instruction: "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper. This ensures even baking and easy cleanup.",
                image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
                time: 300,
                ingredients: ["Baking sheets", "Parchment paper", "Oven"]
            },
            {
                title: "Mix Dry Ingredients",
                instruction: "In a medium bowl, whisk together flour, baking soda, and salt until well combined.",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
                time: 180,
                ingredients: ["2 cups all-purpose flour", "1 tsp baking soda", "1/2 tsp salt"]
            },
            {
                title: "Cream Butter and Sugars",
                instruction: "In a large bowl, beat softened butter with both sugars until light and fluffy, about 3-4 minutes.",
                image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1200&q=80",
                time: 240,
                ingredients: ["1 cup butter, softened", "3/4 cup granulated sugar", "3/4 cup brown sugar"]
            },
            {
                title: "Add Eggs and Vanilla",
                instruction: "Beat in eggs one at a time, ensuring each is fully incorporated. Then add vanilla extract and mix well.",
                image: "https://images.unsplash.com/photo-1587241321921-91a834d82ffc?w=1200&q=80",
                time: 120,
                ingredients: ["2 large eggs", "2 tsp vanilla extract"]
            },
            {
                title: "Combine and Add Chips",
                instruction: "Gradually mix in the dry ingredients until just combined. Fold in chocolate chips gently with a spatula.",
                image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&q=80",
                time: 180,
                ingredients: ["Dry mixture", "2 cups chocolate chips"]
            },
            {
                title: "Shape and Bake",
                instruction: "Drop rounded tablespoons of dough onto prepared sheets, spacing 2 inches apart. Bake for 9-11 minutes until edges are golden brown. Cool on sheet for 5 minutes before transferring.",
                image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&q=80",
                time: 660,
                ingredients: ["Cookie dough", "Cooling rack"]
            }
        ]
    },
    {
        id: 2,
        title: "Creamy Tomato Pasta",
        mood: "comfort",
        time: "30 min",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=80",
        steps: [
            {
                title: "Boil Pasta",
                instruction: "Bring a large pot of salted water to a rolling boil. Add pasta and cook until al dente according to package directions. Reserve 1 cup pasta water before draining.",
                image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=1200&q=80",
                time: 600,
                ingredients: ["1 lb pasta", "2 tbsp salt", "Water"]
            },
            {
                title: "Sauté Garlic",
                instruction: "While pasta cooks, heat olive oil in a large skillet over medium heat. Add minced garlic and sauté until fragrant, about 1-2 minutes. Don't let it brown.",
                image: "https://images.unsplash.com/photo-1599909533730-f9d7e5a5a3b3?w=1200&q=80",
                time: 120,
                ingredients: ["2 tbsp olive oil", "4 cloves garlic, minced"]
            },
            {
                title: "Add Tomatoes",
                instruction: "Pour in crushed tomatoes and stir well. Season with salt, pepper, and Italian herbs. Let simmer for 5 minutes to develop flavors.",
                image: "https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=1200&q=80",
                time: 300,
                ingredients: ["1 can (28 oz) crushed tomatoes", "Salt", "Pepper", "1 tsp Italian herbs"]
            },
            {
                title: "Make it Creamy",
                instruction: "Reduce heat to low and stir in heavy cream. Simmer gently for 3-4 minutes until sauce thickens slightly. Taste and adjust seasoning.",
                image: "https://images.unsplash.com/photo-1611171711912-e0e5b8a35d3b?w=1200&q=80",
                time: 240,
                ingredients: ["1 cup heavy cream"]
            },
            {
                title: "Combine and Serve",
                instruction: "Add drained pasta to the sauce and toss to coat evenly. Add reserved pasta water if needed for consistency. Stir in parmesan cheese and fresh basil. Serve immediately with extra parmesan on top.",
                image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=80",
                time: 180,
                ingredients: ["Cooked pasta", "1/2 cup parmesan cheese", "Fresh basil leaves"]
            }
        ]
    },
    {
        id: 3,
        title: "Avocado Toast Deluxe",
        mood: "quick",
        time: "15 min",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=1200&q=80",
        steps: [
            {
                title: "Toast Bread",
                instruction: "Toast sourdough slices in a toaster or on a grill pan until golden brown and crispy on both sides.",
                image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
                time: 180,
                ingredients: ["2 thick slices sourdough bread"]
            },
            {
                title: "Prepare Avocado",
                instruction: "Cut avocado in half, remove pit, and scoop flesh into a bowl. Add lemon juice, salt, and pepper.",
                image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=1200&q=80",
                time: 90,
                ingredients: ["1 ripe avocado", "1 tbsp lemon juice", "Salt", "Black pepper"]
            },
            {
                title: "Mash Avocado",
                instruction: "Using a fork, mash the avocado to your desired consistency - chunky or smooth. Taste and adjust seasoning if needed.",
                image: "https://images.unsplash.com/photo-1528750997573-59f0c1e8b1a5?w=1200&q=80",
                time: 120,
                ingredients: ["Seasoned avocado"]
            },
            {
                title: "Fry Eggs",
                instruction: "Heat olive oil in a non-stick pan over medium heat. Crack eggs into the pan and fry to your preferred doneness - sunny side up or over easy works great.",
                image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80",
                time: 240,
                ingredients: ["2 eggs", "1 tbsp olive oil"]
            },
            {
                title: "Assemble and Garnish",
                instruction: "Spread mashed avocado generously on toasted bread. Top with fried egg, halved cherry tomatoes, and sprinkle with red pepper flakes. Drizzle with extra olive oil and add microgreens if desired. Serve immediately.",
                image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=1200&q=80",
                time: 120,
                ingredients: ["Toasted bread", "Avocado mash", "Fried eggs", "Cherry tomatoes", "Red pepper flakes", "Olive oil"]
            }
        ]
    },
    {
        id: 4,
        title: "Berry Smoothie Bowl",
        mood: "healthy",
        time: "15 min",
        difficulty: "Easy",
        image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=1200&q=80",
        steps: [
            {
                title: "Freeze Ingredients",
                instruction: "Ensure your berries and banana slices are completely frozen. This creates the thick, ice-cream-like consistency that's perfect for a smoothie bowl.",
                image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=80",
                time: 120,
                ingredients: ["2 cups frozen mixed berries", "1 frozen banana"]
            },
            {
                title: "Blend Base",
                instruction: "Add frozen berries, banana, and Greek yogurt to a high-speed blender. Start blending on low, gradually increasing speed.",
                image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=1200&q=80",
                time: 180,
                ingredients: ["2 cups frozen berries", "1 frozen banana", "1 cup Greek yogurt"]
            },
            {
                title: "Adjust Consistency",
                instruction: "Add milk or juice gradually, just enough to help blending. The mixture should be very thick - thicker than a regular smoothie. Use the tamper if your blender has one.",
                image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=1200&q=80",
                time: 120,
                ingredients: ["1/4 cup almond milk", "1 tbsp honey (optional)"]
            },
            {
                title: "Pour into Bowl",
                instruction: "Scoop the thick smoothie mixture into a wide, shallow bowl. Smooth the top with the back of a spoon to create an even surface for toppings.",
                image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=1200&q=80",
                time: 60,
                ingredients: ["Smoothie base"]
            },
            {
                title: "Arrange Toppings",
                instruction: "Artfully arrange your toppings in sections or rows. Add granola for crunch, fresh berries for color, sliced banana, coconut flakes, chia seeds, and a drizzle of honey. Get creative with the presentation!",
                image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=1200&q=80",
                time: 180,
                ingredients: ["1/4 cup granola", "Fresh berries", "Sliced banana", "2 tbsp coconut flakes", "1 tbsp chia seeds", "Honey drizzle"]
            }
        ]
    }
];

// ========================================
// NAVIGATION
// ========================================

function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    appState.currentScreen = screenId;
}

// ========================================
// USER MANAGEMENT
// ========================================

function saveUserData() {
    if (!appState.userName) return;

    if (!appState.users[appState.userName]) {
        appState.users[appState.userName] = {
            name: appState.userName,
            recipes: [],
            totalRecipes: 0,
            streak: 0,
            lastCookDate: null,
            xp: 0,
            achievements: []
        };
    }

    localStorage.setItem('cookflow_users', JSON.stringify(appState.users));
}

function addCompletedRecipe(recipe, timeSpent) {
    const user = appState.users[appState.userName];
    const completionData = {
        recipeId: recipe.id,
        recipeName: recipe.title,
        recipeImage: recipe.image,
        completedAt: new Date().toISOString(),
        timeSpent: timeSpent,
        steps: recipe.steps.length
    };

    user.recipes.push(completionData);
    user.totalRecipes++;

    // Update streak
    const today = new Date().toDateString();
    if (user.lastCookDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (user.lastCookDate === yesterday) {
            user.streak++;
        } else {
            user.streak = 1;
        }
        user.lastCookDate = today;
    }

    saveUserData();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#E67E22', '#F39C12', '#D35400', '#FFE5CC', '#FFDAB9'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

function showNotification(message) {
    // Simple notification system
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #F39C12, #E67E22);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: 700;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// ========================================
// GAMIFICATION SYSTEM
// ========================================

function getUserLevel(xp) {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (xp >= LEVELS[i].minXP) {
            return LEVELS[i];
        }
    }
    return LEVELS[0];
}

function getXPForNextLevel(currentXP) {
    const currentLevel = getUserLevel(currentXP);
    if (currentLevel.level === LEVELS.length) {
        return currentLevel.maxXP; // Max levelX
    }
    return LEVELS[currentLevel.level].maxXP + 1;
}

function addXP(amount, reason) {
    const user = appState.users[appState.userName];
    if (!user.xp) user.xp = 0;

    const oldLevel = getUserLevel(user.xp);
    user.xp += amount;
    const newLevel = getUserLevel(user.xp);

    saveUserData();

    // Level up notification
    if (newLevel.level > oldLevel.level) {
        createConfetti();
        setTimeout(() => createConfetti(), 300);
        showNotification(`🎉 Level Up! You're now a ${newLevel.title}!`);
    } else {
        showNotification(`+${amount} XP! ${reason}`);
    }
}

function checkAchievements() {
    const user = appState.users[appState.userName];
    if (!user.achievements) user.achievements = [];

    const newAchievements = [];

    // Check each achievement
    ACHIEVEMENTS.forEach(achievement => {
        if (user.achievements.includes(achievement.id)) return;

        let unlocked = false;

        switch (achievement.id) {
            case 'first_recipe':
                unlocked = user.totalRecipes >= 1;
                break;
            case 'five_recipes':
                unlocked = user.totalRecipes >= 5;
                break;
            case 'ten_recipes':
                unlocked = user.totalRecipes >= 10;
                break;
            case 'week_streak':
                unlocked = user.streak >= 7;
                break;
            case 'all_categories':
                const categories = new Set(user.recipes.map(r => {
                    const recipe = recipes.find(rec => rec.id === r.recipeId);
                    return recipe ? recipe.mood : null;
                }));
                unlocked = categories.size >= 4;
                break;
        }

        if (unlocked) {
            user.achievements.push(achievement.id);
            newAchievements.push(achievement);
            addXP(achievement.xp, `Achievement: ${achievement.name}`);
        }
    });

    saveUserData();
    return newAchievements;
}

function toggleFavorite(recipeId) {
    const index = appState.favorites.indexOf(recipeId);
    if (index > -1) {
        appState.favorites.splice(index, 1);
        showNotification('Removed from favorites');
    } else {
        appState.favorites.push(recipeId);
        showNotification('❤️ Added to favorites!');
    }
    localStorage.setItem('cookflow_favorites', JSON.stringify(appState.favorites));
}

function isFavorite(recipeId) {
    return appState.favorites.includes(recipeId);
}

function rateRecipe(recipeId, rating) {
    if (!appState.ratings[recipeId]) {
        appState.ratings[recipeId] = [];
    }
    appState.ratings[recipeId].push({
        user: appState.userName,
        rating: rating,
        date: new Date().toISOString()
    });
    localStorage.setItem('cookflow_ratings', JSON.stringify(appState.ratings));
    showNotification(`⭐ Rated ${rating} stars!`);
}

function getAverageRating(recipeId) {
    const ratings = appState.ratings[recipeId];
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    return (sum / ratings.length).toFixed(1);
}

function generateDailyChallenge() {
    const today = new Date().toDateString();

    // Check if we already have today's challenge
    if (appState.dailyChallenge && appState.dailyChallenge.date === today) {
        return appState.dailyChallenge;
    }

    // Generate new challenge
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    const challenge = {
        date: today,
        recipeId: randomRecipe.id,
        recipeName: randomRecipe.title,
        recipeImage: randomRecipe.image,
        bonusXP: 200,
        completed: false
    };

    appState.dailyChallenge = challenge;
    localStorage.setItem('cookflow_daily_challenge', JSON.stringify(challenge));
    return challenge;
}

function completeDailyChallenge() {
    if (appState.dailyChallenge && !appState.dailyChallenge.completed) {
        appState.dailyChallenge.completed = true;
        localStorage.setItem('cookflow_daily_challenge', JSON.stringify(appState.dailyChallenge));
        addXP(appState.dailyChallenge.bonusXP, 'Daily Challenge Complete!');
        createConfetti();
        setTimeout(() => createConfetti(), 500);
    }
}

// ========================================
// INITIALIZE APP
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // WELCOME SCREEN
    // ========================================

    const userNameInput = document.getElementById('userName');
    const continueBtn = document.getElementById('continueToMoodBtn');

    // Add enter key support
    userNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            continueBtn.click();
        }
    });

    continueBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('userName');
        const name = nameInput.value.trim();

        if (!name) {
            alert('Please enter your name');
            return;
        }

        appState.userName = name;
        saveUserData();

        // Update header with user name
        document.getElementById('headerUserName').textContent = name;
        const user = appState.users[appState.userName];
        document.getElementById('headerStreak').textContent = user.streak;

        showNotification(`Welcome, ${name}! 🎉`);
        navigateTo('moodScreen');
    });

    // ========================================
    // DISCOVERY SCREEN
    // ========================================

    let currentFilter = 'all';
    let searchQuery = '';

    function renderAllRecipes() {
        const grid = document.getElementById('allRecipesGrid');
        const noResults = document.getElementById('noResults');

        // Filter recipes
        let filteredRecipes = recipes;

        if (currentFilter !== 'all') {
            filteredRecipes = filteredRecipes.filter(r => r.mood === currentFilter);
        }

        if (searchQuery) {
            filteredRecipes = filteredRecipes.filter(r =>
                r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.difficulty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.mood.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.steps.some(step =>
                    step.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
                )
            );
        }

        // Update count
        document.getElementById('recipesCount').textContent =
            `${filteredRecipes.length} ${filteredRecipes.length === 1 ? 'Recipe' : 'Recipes'}`;

        // Show/hide no results
        if (filteredRecipes.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            grid.style.display = 'grid';
            noResults.style.display = 'none';
        }

        // Render cards
        grid.innerHTML = filteredRecipes.map(recipe => `
            <div class="recipe-card-full" data-recipe-id="${recipe.id}">
                <div class="recipe-card-image-wrapper">
                    <img src="${recipe.image}" alt="${recipe.title}" class="recipe-card-image">
                    <div class="recipe-card-badge">${recipe.difficulty}</div>
                </div>
                <div class="recipe-card-content">
                    <h3 class="recipe-card-title">${recipe.title}</h3>
                    <div class="recipe-card-meta">
                        <div class="recipe-card-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <span>${recipe.time}</span>
                        </div>
                        <div class="recipe-card-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                            </svg>
                            <span>${recipe.steps.length} steps</span>
                        </div>
                    </div>
                    <div class="recipe-card-cta">Start Cooking →</div>
                </div>
            </div>
        `).join('');

        // Add click handlers
        document.querySelectorAll('.recipe-card-full').forEach(card => {
            card.addEventListener('click', () => {
                appState.selectedRecipe = recipes.find(r => r.id == card.dataset.recipeId);
                showRecipeOverview();
                navigateTo('overviewScreen');
            });
        });
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchClearBtn = document.getElementById('searchClearBtn');

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();

        if (searchQuery) {
            searchClearBtn.style.display = 'flex';
        } else {
            searchClearBtn.style.display = 'none';
        }

        renderAllRecipes();
    });

    searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        searchClearBtn.style.display = 'none';
        renderAllRecipes();
    });

    // Filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.dataset.filter;
            renderAllRecipes();
        });
    });

    // Browse all button from mood screen
    document.getElementById('browseAllBtn').addEventListener('click', () => {
        // Update discovery header
        document.getElementById('headerUserNameDiscovery').textContent = appState.userName;
        const user = appState.users[appState.userName];
        document.getElementById('headerStreakDiscovery').textContent = user.streak;

        renderAllRecipes();
        navigateTo('discoveryScreen');
    });

    // ========================================
    // MOOD SELECTION
    // ========================================

    document.querySelectorAll('.mood-card-interactive').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.mood-card-interactive').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            appState.selectedMood = card.dataset.mood;

            showRecipesForMood(appState.selectedMood);
            document.getElementById('recipePreviewSection').style.display = 'block';
        });
    });

    function showRecipesForMood(mood) {
        const grid = document.getElementById('recipePreviewGrid');
        const filtered = recipes.filter(r => r.mood === mood);

        grid.innerHTML = filtered.map(recipe => `
        <div class="recipe-preview-card" data-recipe-id="${recipe.id}">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-preview-image">
            <div class="recipe-preview-content">
                <h3 class="recipe-preview-title">${recipe.title}</h3>
                <div class="recipe-preview-meta">
                    <span>${recipe.time}</span>
                    <span>${recipe.difficulty}</span>
                </div>
            </div>
        </div>
    `).join('');

        document.querySelectorAll('.recipe-preview-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.recipe-preview-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                appState.selectedRecipe = recipes.find(r => r.id == card.dataset.recipeId);
                document.getElementById('startCookingBtn').style.display = 'flex';
            });
        });
    }

    document.getElementById('startCookingBtn').addEventListener('click', () => {
        if (!appState.selectedRecipe) return;
        showRecipeOverview();
        navigateTo('overviewScreen');
    });

    // ========================================
    // RECIPE OVERVIEW
    // ========================================

    function showRecipeOverview() {
        const recipe = appState.selectedRecipe;
        document.getElementById('overviewImage').src = recipe.image;
        document.getElementById('overviewTitle').textContent = recipe.title;
        document.getElementById('overviewTime').textContent = recipe.time;
        document.getElementById('overviewSteps').textContent = `${recipe.steps.length} steps`;
        document.getElementById('overviewDifficulty').textContent = recipe.difficulty;
    }

    document.getElementById('startTutorialBtn').addEventListener('click', () => {
        appState.currentStep = 0;
        appState.recipeStartTime = Date.now();
        showNotification('Let\'s start cooking! 👨‍🍳');
        showTutorialStep();
        navigateTo('tutorialScreen');
    });

    document.getElementById('backToMoodBtn').addEventListener('click', () => {
        navigateTo('moodScreen');
    });

    // ========================================
    // TUTORIAL STEPS
    // ========================================

    function showTutorialStep() {
        const recipe = appState.selectedRecipe;
        const step = recipe.steps[appState.currentStep];
        const progress = ((appState.currentStep + 1) / recipe.steps.length) * 100;

        document.getElementById('tutorialRecipeName').textContent = recipe.title;
        document.getElementById('stepIndicator').textContent = `Step ${appState.currentStep + 1} of ${recipe.steps.length}`;
        document.getElementById('progressPercentage').textContent = `${Math.round(progress)}%`;
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('stepNumberBadge').textContent = appState.currentStep + 1;

        document.getElementById('stepImage').src = step.image;
        document.getElementById('stepTitle').textContent = step.title;
        document.getElementById('stepInstruction').textContent = step.instruction;

        // Update next button text
        const nextBtn = document.getElementById('nextStepBtn');
        const nextBtnText = document.getElementById('nextStepText');
        if (appState.currentStep === recipe.steps.length - 1) {
            nextBtnText.textContent = 'Complete Recipe!';
        } else {
            nextBtnText.textContent = 'Next Step';
        }

        // Show/hide previous button
        const prevBtn = document.getElementById('prevStepBtn');
        if (appState.currentStep === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
        }

        // Timer
        appState.timerSeconds = step.time;
        updateTimerDisplay();
        resetTimer();

        // Ingredients
        const ingredientsList = document.getElementById('ingredientsList');
        ingredientsList.innerHTML = step.ingredients.map((ing, idx) => `
        <div class="ingredient-item" data-index="${idx}">
            <div class="ingredient-checkbox">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
            <span class="ingredient-text">${ing}</span>
        </div>
    `).join('');

        document.querySelectorAll('.ingredient-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('checked');
            });
        });
    }

    document.getElementById('nextStepBtn').addEventListener('click', () => {
        if (appState.currentStep < appState.selectedRecipe.steps.length - 1) {
            appState.currentStep++;
            resetTimer();
            showTutorialStep();
            showNotification(`Step ${appState.currentStep + 1} started! 🔥`);
        } else {
            completeRecipe();
        }
    });

    document.getElementById('prevStepBtn').addEventListener('click', () => {
        if (appState.currentStep > 0) {
            appState.currentStep--;
            resetTimer();
            showTutorialStep();
        }
    });

    document.getElementById('exitTutorialBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to exit the tutorial?')) {
            resetTimer();
            navigateTo('overviewScreen');
        }
    });

    // ========================================
    // TIMER
    // ========================================

    function updateTimerDisplay() {
        const mins = Math.floor(appState.timerSeconds / 60);
        const secs = appState.timerSeconds % 60;
        document.getElementById('timerDisplay').textContent =
            `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function resetTimer() {
        if (appState.timerInterval) {
            clearInterval(appState.timerInterval);
            appState.timerInterval = null;
        }
        document.getElementById('startTimerBtn').style.display = 'block';
        document.getElementById('pauseTimerBtn').style.display = 'none';
    }

    document.getElementById('startTimerBtn').addEventListener('click', () => {
        document.getElementById('startTimerBtn').style.display = 'none';
        document.getElementById('pauseTimerBtn').style.display = 'block';

        appState.timerInterval = setInterval(() => {
            if (appState.timerSeconds > 0) {
                appState.timerSeconds--;
                updateTimerDisplay();
            } else {
                resetTimer();
            }
        }, 1000);
    });

    document.getElementById('pauseTimerBtn').addEventListener('click', () => {
        resetTimer();
    });

    document.getElementById('resetTimerBtn').addEventListener('click', () => {
        resetTimer();
        appState.timerSeconds = appState.selectedRecipe.steps[appState.currentStep].time;
        updateTimerDisplay();
    });

    // ========================================
    // COMPLETION
    // ========================================

    function completeRecipe() {
        const recipe = appState.selectedRecipe;
        const timeSpent = Math.floor((Date.now() - appState.recipeStartTime) / 1000);

        addCompletedRecipe(recipe, timeSpent);

        // Award XP
        let baseXP = 100;
        addXP(baseXP, 'Recipe Completed!');

        // Check for speed demon achievement
        if (timeSpent < 900) { // Under 15 minutes
            const user = appState.users[appState.userName];
            if (!user.achievements) user.achievements = [];
            if (!user.achievements.includes('speed_demon')) {
                user.achievements.push('speed_demon');
                const achievement = ACHIEVEMENTS.find(a => a.id === 'speed_demon');
                addXP(achievement.xp, `Achievement: ${achievement.name}`);
            }
        }

        // Check all achievements
        checkAchievements();

        // Check daily challenge
        if (appState.dailyChallenge && appState.dailyChallenge.recipeId === recipe.id) {
            completeDailyChallenge();
        }

        // Trigger confetti celebration!
        createConfetti();
        setTimeout(() => createConfetti(), 500);
        setTimeout(() => createConfetti(), 1000);

        document.getElementById('completionImage').src = recipe.image;
        document.getElementById('completionUserName').textContent = appState.userName;
        document.getElementById('completionRecipeName').textContent = recipe.title;
        document.getElementById('completionSteps').textContent = recipe.steps.length;

        const mins = Math.floor(timeSpent / 60);
        document.getElementById('completionTime').textContent = `${mins} min`;

        const user = appState.users[appState.userName];
        document.getElementById('achievementText').textContent =
            user.totalRecipes === 1 ? 'First Recipe Completed!' : `${user.totalRecipes} Recipes Mastered!`;

        showNotification('🎉 Recipe completed! You\'re amazing!');
        navigateTo('completionScreen');
    }

    document.getElementById('viewProgressBtn').addEventListener('click', () => {
        showDashboard();
        navigateTo('dashboardScreen');
    });

    document.getElementById('cookAnotherBtn').addEventListener('click', () => {
        navigateTo('moodScreen');
    });

    // Dashboard quick access from tutorial
    document.getElementById('dashboardQuickBtn').addEventListener('click', () => {
        showDashboard();
        navigateTo('dashboardScreen');
    });

    // ========================================
    // DASHBOARD
    // ========================================

    function showDashboard() {
        const user = appState.users[appState.userName];

        document.getElementById('dashboardUserName').textContent = appState.userName;
        document.getElementById('totalRecipes').textContent = user.totalRecipes;
        document.getElementById('currentStreak').textContent = user.streak;

        const historyList = document.getElementById('recipeHistoryList');
        historyList.innerHTML = user.recipes.slice().reverse().map(r => `
        <div class="recipe-history-item">
            <img src="${r.recipeImage}" alt="${r.recipeName}" class="recipe-history-image">
            <div class="recipe-history-details">
                <h3 class="recipe-history-title">${r.recipeName}</h3>
                <p class="recipe-history-meta">${r.steps} steps • ${Math.floor(r.timeSpent / 60)} min</p>
                <p class="recipe-history-date">${new Date(r.completedAt).toLocaleDateString()}</p>
            </div>
        </div>
    `).join('');
    }

    document.getElementById('backFromDashboardBtn').addEventListener('click', () => {
        navigateTo('moodScreen');
    });

    // Initialize
    if (appState.userName) {
        navigateTo('moodScreen');
    }

}); // End DOMContentLoaded
