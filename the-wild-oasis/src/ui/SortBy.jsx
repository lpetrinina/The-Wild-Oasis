import { useSearchParams } from "react-router";

import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = function (e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      $type='white'
      options={options}
      activeValue={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
