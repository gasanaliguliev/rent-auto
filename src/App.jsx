import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import CatalogPages from './pages/CatalogPage';
import FavoritePage from './pages/FavoritePage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPages />} />
          <Route path="favorite" element={<FavoritePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
