import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useNavigate } from "react-router";
import { useActions } from "../../hooks/useActions";
import { ISearchProduct } from "./types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const ListProductPage: React.FC = () => {

    const navigator = useNavigate();
    const { ProductFetchActions } = useActions();
    const [name, setName] = useState<string>("");
    const [query, setQuery] = useState<string>(window.location.search);

    async function getProducts(search: ISearchProduct) {
       
        try {
            await ProductFetchActions(search);
          
        } catch (ex) {
           
        }
    }
    const { product, last_page, current_page, total } = useTypedSelector((store) => store.prod);
    var pages: Array<number> = new Array(last_page);
    for (let i = 1; i <= last_page; i++) {
        pages.push(i);
    }

    useEffect(() => {
        const params = new URLSearchParams(query);
        const name = params?.get("name") ?? "";       
        setName(name);
        const search: ISearchProduct = {
            page: params?.get("page") ?? 1,
            name: name,
            
        };
        getProducts(search);
    }, [query]);

   
    const searchProd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const input = form.querySelector('#searchName') as HTMLInputElement;
        const name = input.value;
        setQuery("?name=" + name);
        navigator("?name=" + name);
    }

    return (
        <>
            <h1 className="text-center mt-3">Товари</h1>
            <form className="form-control-sm" onSubmit={event => searchProd(event)}>

                <input
                    id="searchName"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className="btn btn-outline-primary btn-sm ms-2"
                    type="submit">
                    По назві
                </button>

            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <h4>Всього записів: {total}</h4>
            <hr />

            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages.map((page, key) => {
                        const url = "?page=" + page + "&name=" + name;
                        return (
                            <li
                                className={classNames("page-item", {
                                    active: current_page === page,
                                })}
                                key={key}
                            >
                                <Link   className="page-link"
                                    to={url}
                                    onClick={() => {
                                        setQuery(url);
                                    }}
                                >
                                    {page}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    )

}

export default ListProductPage;