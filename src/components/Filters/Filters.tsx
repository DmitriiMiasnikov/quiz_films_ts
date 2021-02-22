import React from 'react';
import { connect } from 'react-redux';
import { FiltersDom } from './FiltersDom';
import { setCurrentFilter } from './../../store/filtersReducer';
import { clearList } from './../../store/listReducer';

type Props = {
  filters: {
    name: string,
    title: string
  }[],
  currentFilter: string,
  setCurrentFilter: (name: string) => void,
  clearList: () => void
}

const Filters = (props: Props) => {

  const filterHandler = (name: string) => {
    if (props.currentFilter !== name) props.clearList()
    props.setCurrentFilter(name)
  }
  return (
    <FiltersDom {...props} filterHandler={filterHandler}/>
  )
}

const mapStatesToProps = (state: any) => {
  return {
    filters: state.filters.filters,
    currentFilter: state.filters.currentFilter
  }
}

export default connect(mapStatesToProps, { setCurrentFilter, clearList })(Filters)