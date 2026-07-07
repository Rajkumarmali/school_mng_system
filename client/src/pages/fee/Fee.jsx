import React from 'react'
import './Fee.css'
import { useSearchParams } from 'react-router-dom'
import FeeType from './FeeType';
import FeeStructure from './FeeStructure';



const Fee = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") || "info"

    return (
        <div className='fee-container'>
            <nav class="fee-nav-card navbar-expand-lg ">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "info" })}
                        >
                            Fee Dashboard
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "fee-type" })}
                        >
                            Fee Type
                        </button>
                    </li>
                    <li class="nav-item">
                        <button
                            class="nav-link"
                            onClick={() => setSearchParams({ tab: "fee-structure" })}
                        >
                            Fee Structure
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="fee-card">
                {
                    activeTab === "fee-type" ?
                        <FeeType />
                        :
                        activeTab === "fee-structure" ?
                            < FeeStructure />
                            :
                            <div>
                                Dashboard
                            </div>
                }
            </div>
        </div>
    )
}

export default Fee
