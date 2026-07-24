import React, { useEffect } from 'react'
import './Notification.css'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification, updateNotification } from '../../state/notification/Action';
const Notification = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get("size")) || 10;

    const dispatch = useDispatch();
    const notification = useSelector((state) => state.notification);

    const totalPages = notification?.notifications?.totalPages || 0;
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (pageNumber > 3) {
                pages.push("...");
            }

            for (
                let i = Math.max(2, pageNumber - 1);
                i <= Math.min(totalPages - 1, pageNumber + 1);
                i++
            ) {
                pages.push(i);
            }

            if (pageNumber < totalPages - 2) {
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const handleChangePageSize = (e) => {
        const pageSize = e.target.value
        setSearchParams({
            page: 1,
            size: pageSize
        })
    }

    const handleGetPerviousPageData = () => {
        setSearchParams({
            page: pageNumber - 1,
            size: pageSize
        })
    }

    const handleGetNextPageData = () => {
        setSearchParams({
            page: pageNumber + 1,
            size: pageSize
        })
    }

    const handleGetPageNumberData = (pageNumber) => {
        setSearchParams({
            page: pageNumber,
            size: pageSize
        })
    }

    const handleUpdateNotification = async (notificationId) => {
        await dispatch(updateNotification(notificationId))
        await dispatch(getNotification(pageNumber, pageSize))
    }

    useEffect(() => {
        dispatch(getNotification(pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize]);

    return (
        <div className='notification-container'>
            <div className='notification-card'>
                <div className="notification-header">
                    <div>
                        <h2>
                            <i className="bi bi-bell-fill me-2"></i>
                            Notifications
                        </h2>
                        <span>
                            {notification?.notifications?.totalElements || 0} Notifications
                        </span>
                    </div>
                </div>
                <div className="notification-list">
                    {
                        notification?.notifications?.content?.length > 0 ?
                            notification?.notifications?.content?.map((item) =>
                                <button
                                    onClick={() => handleUpdateNotification(item.id)}
                                    key={item.id}
                                    className={`notification-item ${!item.isRead ? "unread" : ""}`}
                                    disabled={item.isRead}
                                >
                                    <div className="notification-icon">
                                        <i className="bi bi-envelope-paper-fill"></i>
                                    </div>
                                    <div className="notification-content">
                                        <div className="notification-top">

                                            <h5>{item.title}</h5>

                                            <small>
                                                {item.time
                                                    ? new Date(item.time).toLocaleString()
                                                    : "-"}
                                            </small>
                                        </div>
                                        <p>{item.message}</p>
                                    </div>
                                </button>
                            )
                            :
                            <div className="empty-notification">
                                <i className="bi bi-bell-slash-fill"></i>
                                <h4>No Notifications</h4>
                            </div>
                    }
                </div>
                <div className="pagination-container">
                    <div className="pagination-info">
                        Total : <strong>{notification?.notifications?.totalElements || 0}</strong>
                    </div>
                    <div className="page-size-selector">
                        <label>Show :</label>
                        <select
                            value={pageSize}
                            onChange={handleChangePageSize}
                        >
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <ul className="custom-pagination">
                        <li>
                            <button
                                onClick={handleGetPerviousPageData}
                                disabled={pageNumber === 1}
                            >
                                &laquo;
                            </button>
                        </li>
                        {getPageNumbers().map((page, index) =>
                            page === "..." ? (
                                <li key={index} className="dots">
                                    ...
                                </li>
                            ) : (
                                <li key={index}>
                                    <button
                                        className={pageNumber === page ? "active-page" : ""}
                                        onClick={() => handleGetPageNumberData(page)}
                                    >
                                        {page}
                                    </button>
                                </li>
                            )
                        )}
                        <li>
                            <button
                                onClick={handleGetNextPageData}
                                disabled={pageNumber === totalPages}
                            >
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Notification
