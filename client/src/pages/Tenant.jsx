import React, { useEffect, useState } from 'react';
import './Tenant.css';
import { useDispatch, useSelector } from "react-redux";
import { createTenatn, getTenantById, getTenants, updateTenant } from '../state/tenant/Action';

const Tenant = () => {
    const dispatch = useDispatch();
    const tenants = useSelector((state) => state.tenant);

    const [isEditModal, setIsEditModal] = useState(false);
    const [isAddModal, setIsAddModal] = useState(false);
    const [upateTenantId, setUpdateTenantId] = useState();

    const [tenantData, setTenantData] = useState({
        tenantName: '',
        email: ''
    });


    const handleAddModel = () => {
        setTenantData({
            email: '',
            tenantName: ''
        })
        setIsAddModal(true)
        setIsEditModal(false)
    }

    const handleEditModal = (id) => {
        dispatch(getTenantById(id))
        setUpdateTenantId(id);
        setIsAddModal(false)
        setIsEditModal(true)
    }
    const handelChange = (e) => {
        const { name, value } = e.target;
        setTenantData({
            ...tenantData,
            [name]: value
        })
    }

    const handelAddOrEditTenant = async () => {
        if (isAddModal) {
            await dispatch(createTenatn(tenantData));
            await dispatch(getTenants());
        } else {
            await dispatch(updateTenant(tenantData, upateTenantId))
            await dispatch(getTenants())
        }
        setTenantData({
            email: '',
            tenantName: ''
        })
    }

    useEffect(() => {
        dispatch(getTenants());
    }, [dispatch]);

    useEffect(() => {
        setTenantData({
            tenantName: tenants?.tenant?.tenantName
        })
    }, [tenants?.tenant])

    return (
        <div className="tenant-container">
            <div className="tenant-header">
                <div>
                    <h2>Tenant Management</h2>
                    <p>Manage all tenants from one place</p>
                </div>

                <button onClick={handleAddModel} className="add-tenant-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Tenant
                </button>
            </div>
            <div className="tenant-card">
                <table className="table tenant-table">
                    <thead>
                        <tr>
                            <th>S No.</th>
                            <th>ID</th>
                            <th>Tenant Name</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants?.tenants?.length > 0 ? (
                            tenants?.tenants?.map((tenant, index) => (
                                <tr key={tenant.id}>
                                    <td>{index + 1}.</td>
                                    <td>{tenant.id}</td>
                                    <td>{tenant.tenantName}</td>
                                    <td className="text-center">
                                        <button onClick={() => handleEditModal(tenant.id)} className="btn btn-sm custom-edit-btn me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No Tenants Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"           >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content custom-modal">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {isEditModal ? "Edit Tenant" : "Add New Tenant"}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="modal-input"
                                placeholder={
                                    isEditModal
                                        ? "Edit Tenant Name"
                                        : "Enter Tenant Name"
                                }
                                name="tenantName"
                                value={tenantData.tenantName}
                                onChange={handelChange}
                            />
                        </div>
                        {isAddModal &&
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="modal-input"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={tenantData.email}
                                    onChange={handelChange}
                                />
                            </div>
                        }
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn modal-close-btn"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                onClick={handelAddOrEditTenant}
                                className="btn modal-save-btn"
                                data-bs-dismiss="modal"
                            >
                                {isEditModal ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tenant;