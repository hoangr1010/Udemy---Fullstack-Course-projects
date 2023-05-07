import React from 'react';
import { useSelector } from 'react-redux';
import { selectCategories } from '../features/categories/categoriesSlice';
import { selectArticles } from '../features/articles/articlesSlice';
import { Link, useParams } from 'react-router-dom';

export default function Category () {
  const categories = useSelector(selectCategories)
  const articles = useSelector(selectArticles)

  const { category } = useParams()

  return (
    <div>
      <h2>Articles Related to {category}</h2>
      <ul>
        { categories[category].map(articleSlug => (
          <li>
            <Link to={`/articles/${articleSlug}`}>{articles[articleSlug].title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
