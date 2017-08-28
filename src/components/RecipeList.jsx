import * as React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom'


const RecipeList = ({recipes, onSelectRecepie}) => (
        <BrowserRouter>
          <ul className="list-unstyled">
              {recipes.map(item =>
                  <li key={item.id}>
                    <Link onClick={onSelectRecepie.bind(null,item)} to={item.name}>{item.name}</Link>
                </li>
              )
            }
          </ul>
        </BrowserRouter>
      )

RecipeList.propTypes={
  recipes: PropTypes.array,
  onSelectRecepie: PropTypes.func
};
export default RecipeList;
