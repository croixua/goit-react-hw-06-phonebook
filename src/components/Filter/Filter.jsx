import PropTypes from 'prop-types';

export default function Filter({ handlerFilter, filter }) {
  return (
    <>
      <p>Find my contacts</p>
      <input type="text" onChange={handlerFilter} value={filter}></input>
    </>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
};
