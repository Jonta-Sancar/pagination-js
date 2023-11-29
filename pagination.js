const pagenation = (parameter)=>{
  let parameters = returnParameters();

  const page_query_index = returnPageIndex(parameters);

  const actual_page = parameters[page_query_index].split('=')[1];

  let page = returnPage(parameter, actual_page);

  let new_query = `page=${page}`;

  if (location.search) {
    parameters[page_query_index] = new_query;
  } else {
    parameters = [`page=${page}`];
  }

  let new_search = `?${parameters.join('&')}`;

  location.search = new_search;
}

const returnParameters = ()=>{
  let search_parameters = [];
  
  if (location.search) {
    const search = location.search.split('?')[1];
    search_parameters = search.split('&');
  }

  return search_parameters;
}

const returnPageIndex = (parameters)=>{
  let index = -1;

  parameters.forEach(query => {
    const i = parameters.indexOf(query);
    const query_arr = query.split('=');

    if (query_arr[0] == 'page') {
      index = i;
    }
  });

  return index;
}

const returnPage = (parameter, actual_page)=>{
  let page = actual_page;
  switch (parameter) {
    case "+":
      page++;
      break;

    case "-":
      page--;
      break;

    default:
      page = parameter;
      break;
  }

  if (page <= 0) {
    page = 1;
  }

  return page;
}
