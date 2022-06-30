import PropTypes from 'prop-types';

export default function Filter({ changeFilter, filter }) {
  return (
    <>
      <p>Find my contacts</p>
      <input type="text" onChange={changeFilter} value={filter}></input>
    </>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
};
