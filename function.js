
    function pagination(parameter){
        let page       = 0;
        let search_arr = [];

        if(location.search){
            const search     = location.search.split('?')[1];
            
            search_arr = search.split('&');

            search_arr.forEach(query=>{
                const query_arr = query.split('=');
                if(query_arr[0] == 'pagina'){
                    page = query_arr[1];
                }
            });
        }

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

        if(page <= 0){
            page = 1;
        }

        let new_query = `pagina=${page}`;

        if(location.search){
            search_arr.forEach(query=>{
                const index = search_arr.indexOf(query);
                const query_arr = query.split('=');

                if(query_arr[0] == 'pagina'){
                    search_arr[index] = new_query;
                }
            });
        } else {
            search_arr = [`pagina=${page}`];
        }

        let new_search = `?${search_arr.join('&')}`;

        if(new_search.indexOf('pagina') < 0){
            page = 2;

            new_query = `pagina=${page}`;

            const new_search_arr = new_search.split('?')[1].split('&');

            new_search = `?${new_query}&${new_search_arr.join('&')}`;
        }

        location.search = new_search;
    }
