import React from 'react';
import { connect } from 'react-redux';
import { FiltersDom } from './FiltersDom';
import { setCurrentFilter } from './../../store/filtersReducer';

type Props = {
  filters: {
    name: string,
    title: string
  }[],
  setCurrentFilter: (name: string) => void
}

const Filters = (props: Props) => {

  const filterHandler = (name: string) => {
    props.setCurrentFilter(name)
  }
  return (
    <FiltersDom {...props} filterHandler={filterHandler}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    filters: state.filters.filters
  }
}

export default connect(mapStatesToProps, { setCurrentFilter })(Filters)