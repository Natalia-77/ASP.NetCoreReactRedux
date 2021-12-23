import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useNavigate } from "react-router";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const ListProductPage: React.FC = () => {
    
    const navigator = useNavigate();

    const [query, setQuery] = useState<string>(window.location.search);

    async function getProducts(search: ISearchProduct) {
      
        try {
            await ProductFetchActions(search);
           
        } catch (ex) {
           
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(query);
        const name = params?.get("name") ?? "";
        const desc = params?.get("description") ?? "";
        setName(name);
        const search: ISearchProduct = {
            page: params?.get("page") ?? 1,
            name: name,
            description: desc
        };
        getProducts(search);
    }, [query]);

    var pages: Array<number> = new Array(last_page);
    for (let i = 1; i <= last_page; i++) {
        pages.push(i);
    }

    const onHandleSubmit = (e: any) => {
        e.preventDefault();

        const name = (document.getElementById("searchName") as HTMLInputElement).value;
        const desc = (document.getElementById("searchDesc") as HTMLInputElement).value;

        if (name || name.length > 0) {
            setQuery("?name=" + name);
            navigator("?name=" + name);
        }      

        if (desc || desc.length > 0) {
            setQuery("?description=" + desc);
            navigator("?description=" + desc);
        }
    };

    return (
        <>           
            <h1 className="text-center mt-3">Товари</h1>
            <form className="form-control-sm" onSubmit={onHandleSubmit}>
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
                <input
                    className="float-end"
                    id="searchDesc"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                />
                <button className="btn btn-outline-primary btn-sm me-2 float-end " type="submit">
                    По опису
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
                                    active: current_page == page,
                                })}
                                key={key}
                            >
                                <Link
                                    className="page-link"
                                    to={url}
                                    onClick={() => {
                                        setQuery(url);
                                    }}
                                >
                                    {page}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    )

}

export default ListProductPage;