import { useState, useEffect } from "react";
import axios from "axios";
import { Wallet, Phone,  TrendingUp, TrendingDown, Layers, ArrowUpRight, ArrowDownRight, CheckCircle2 } from "lucide-react";
import API_BASE_URL from "../../config/api";
import "./Home.css";

const Home = () => {
    let [balance, setBalance] = useState(null);
    let [userData, setUserData] = useState(null);

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        setUserData(userData);
        if (userData?._id) {
            getFrineds(userData?._id);
        }
    }, []);

    const getFrineds = async (userId) => {
        try {
            let apiUrl = `${API_BASE_URL}/readExpence?user=${userId}`;
            axios.get(apiUrl).then((response) => {
                if (response.data.data) {
                    setBalance(response.data.data);
                }
            }).catch((error) => {
                console.log(error);
                alert(error.message);
            });
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    // Calculate total net balance for top KPIs
    const calculateTotals = () => {
        if (!balance || !balance.length) return { totalOwed: 0, totalOwe: 0, netBalance: 0 };
        let totalOwed = 0;
        let totalOwe = 0;
        balance.forEach((ele) => {
            let amt = Number(ele?.amount || 0);
            if (amt > 0) totalOwed += amt;
            else if (amt < 0) totalOwe += Math.abs(amt);
        });
        return { totalOwed, totalOwe, netBalance: totalOwed - totalOwe };
    };

    const totals = calculateTotals();

    return (
        <div className="dashboard-container">
            {/* Header Welcome Bar */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <div>
                    <h2 className="h2 brand-font mb-1">
                        Welcome back, <span className="gradient-text">{userData?.name || "Friend"}</span> 👋
                    </h2>
                    <p className="text-muted mb-0">Overview of your current group balances and expense splits</p>
                </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                    <div className="kpi-card">
                        <div className="kpi-icon-box kpi-indigo">
                            <Wallet size={24} />
                        </div>
                        <div>
                            <span className="text-muted small fw-semibold">Net Overall Balance</span>
                            <h3 className={`h4 mb-0 fw-bold ${totals.netBalance >= 0 ? "text-success" : "text-danger"}`}>
                                {totals.netBalance >= 0 ? `+$${totals.netBalance}` : `-$${Math.abs(totals.netBalance)}`}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="kpi-card">
                        <div className="kpi-icon-box kpi-emerald">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <span className="text-muted small fw-semibold">You are Owed</span>
                            <h3 className="h4 mb-0 fw-bold text-success">
                                +${totals.totalOwed}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-4">
                    <div className="kpi-card">
                        <div className="kpi-icon-box kpi-rose">
                            <TrendingDown size={24} />
                        </div>
                        <div>
                            <span className="text-muted small fw-semibold">You Owe</span>
                            <h3 className="h4 mb-0 fw-bold text-danger">
                                -${totals.totalOwe}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Header */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h4 className="h5 brand-font mb-0 d-flex align-items-center gap-2">
                    <Layers size={18} className="text-primary" />
                    Friend Balances & Split Records
                </h4>
                <span className="badge bg-secondary bg-opacity-25 text-light px-3 py-2 rounded-pill small">
                    {balance?.length || 0} Total Records
                </span>
            </div>

            {/* Cards Grid */}
            {balance?.length > 0 ? (
                <div className="row g-3">
                    {balance.map((ele, i) => {
                        const friendObj = userData?._id === ele?.friend?._id ? ele?.user : ele?.friend;
                        const friendName = friendObj?.name || "Friend";
                        const friendPhone = friendObj?.phone || "N/A";
                        const amt = Number(ele?.amount || 0);

                        return (
                            <div key={i} className="col-12 col-md-6 col-lg-4">
                                <div className={`balance-card h-100 ${amt > 0 ? "card-positive" : amt < 0 ? "card-negative" : ""}`}>
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="user-avatar">
                                                {friendName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h5 className="mb-0 fw-bold">{friendName}</h5>
                                                <small className="text-muted d-flex align-items-center gap-1 mt-1">
                                                    <Phone size={13} />
                                                    {friendPhone}
                                                </small>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
                                        <span className="text-muted small fw-semibold">Balance Status</span>
                                        {amt > 0 ? (
                                            <span className="badge-status badge-positive">
                                                <ArrowUpRight size={14} />
                                                Owes You: ${amt}
                                            </span>
                                        ) : amt < 0 ? (
                                            <span className="badge-status badge-negative">
                                                <ArrowDownRight size={14} />
                                                You Owe: ${Math.abs(amt)}
                                            </span>
                                        ) : (
                                            <span className="badge-status badge-pending">
                                                <CheckCircle2 size={14} />
                                                Settled Up
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="empty-state-card mt-3">
                    <div className="user-avatar mx-auto mb-3" style={{ width: 64, height: 64, fontSize: '1.75rem' }}>
                        <Wallet size={32} />
                    </div>
                    <h4 className="h4 brand-font mb-2">No Active Expenses Found</h4>
                    <p className="text-muted max-w-md mx-auto mb-4" style={{ maxWidth: 460 }}>
                        You haven't split any expenses yet. Connect with friends and add a new shared expense to start tracking!
                    </p>
                </div>
            )}
        </div>
    );
};

export default Home;
