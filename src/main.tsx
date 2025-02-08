import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import App from './App'
import RegisterMeal from './pages/RegisterMeal'
import Profile from './pages/Profile'
import NutritionPlan from './pages/NutritionPlan'
import NutritionistConsult from './pages/NutritionistConsult'
import AncientRecipes from './pages/AncientRecipes'
import ContentUpload from './pages/ContentUpload'
import NutritionEducation from './pages/NutritionEducation'
import ArticleDetail from './pages/ArticleDetail'
import RecipeResult from './pages/RecipeResult'
import SmartShoppingList from './pages/SmartShoppingList'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<App />} />
        <Route path="/register-meal" element={<RegisterMeal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/nutrition-plan" element={<NutritionPlan />} />
        <Route path="/nutritionist-consult" element={<NutritionistConsult />} />
        <Route path="/ancient-recipes" element={<AncientRecipes />} />
        <Route path="/content-upload" element={<ContentUpload />} />
        <Route path="/nutrition-education" element={<NutritionEducation />} />
        <Route path="/content/:id" element={<ArticleDetail />} />
        <Route path="/recipe-result" element={<RecipeResult />} />
        <Route path="/shopping-list" element={<SmartShoppingList />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)