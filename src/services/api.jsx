import PropTypes from 'prop-types';

const MAIN_URL =
  'https://pixabay.com/api/?key=29727763-9de4927242ac493db1fc7e125&image_type=photo&orientation=horizontal&safesearch=true';

export const perPage = 12;

const fetchImages = async (search, page) => {
  return fetch(`${MAIN_URL}&q=${search}&page=${page}&per_page=${perPage}`)
    .then(response => response.json())
    .then(data => {
            return data;
    });
};

export { fetchImages };

fetchImages.propTypes = {
  search: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};