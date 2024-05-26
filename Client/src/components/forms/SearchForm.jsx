import React, { useState } from "react";
import PropTypes from "prop-types";

import { Flex, Box, Input, FormControl, Button } from "@chakra-ui/react";
/** Search widget.
 *
 * Appears on RestaurantsList so it can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { RestaurantsList } -> SearchForm
 */

const SearchForm = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    evt.preventDefault();
    setSearchTerm(evt.target.value);
  }

  return (
    <Box className="SearchForm mb-4" marginTop={4} width={""}>
      <form className="form-inline" onSubmit={handleSubmit}>
        <Input
          className="form-control form-control-lg flex-grow-1"
          name="searchTerm"
          placeholder="Enter search term.."
          value={searchTerm}
          onChange={handleChange}
        />
      </form>
    </Box>
  );
};

SearchForm.propTypes = {
  searchFor: PropTypes.func,
};
export default SearchForm;
