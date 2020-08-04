import React, {useEffect, useState} from "react";
import Users from "./Users";
import UserProducts from "./UserProducts";
import {adminServices} from "../../../services/admin.services";

const Products = () => {
    const [users, setUsers] = useState([]);
    const [userProducts, setUserProducts] = useState([]);

    const getUsers = async () => {
        try {
            const res = await adminServices.fetchUsers()
            setUsers(res.responce || [])
        } catch (e) {
            console.log(e);
        }
    }
    const getUserProducts = async (id) => {
        try {
            const res = await adminServices.fetchUserProducts(id)
            setUserProducts(res.responce)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getUsers();
    }, [])


    return (
        <>
            <Users
                data={users}
                getProducts={getUserProducts}
            />

            <UserProducts
                data={userProducts}
            />
        </>
    )
};

export default Products;