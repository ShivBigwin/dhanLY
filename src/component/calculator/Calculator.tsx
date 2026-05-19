"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function LoanCalculator() {
    // Form state
    const [loanAmount, setLoanAmount] = useState<number>(1000000);
    const [interestRate, setInterestRate] = useState<number>(8.5);
    const [loanTenure, setLoanTenure] = useState<number>(20);
    const [emi, setEmi] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [pieData, setPieData] = useState<any[]>([]);

    // Chart customization
    const COLORS = ['#3B82F6', '#06B6D4', '#10B981', '#F59E0B'];
    const RADIAN = Math.PI / 180;

    // Calculate EMI whenever inputs change
    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, loanTenure]);

    const calculateEMI = () => {
        const principal = loanAmount;
        const annualInterest = interestRate;
        const years = loanTenure;

        // Convert annual interest rate to monthly and years to months
        const monthlyInterest = annualInterest / 12 / 100;
        const numberOfPayments = years * 12;

        // EMI formula: [P x R x (1+R)^N]/[(1+R)^N-1]
        const emiValue = principal * monthlyInterest *
            Math.pow(1 + monthlyInterest, numberOfPayments) /
            (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

        const totalPaymentValue = emiValue * numberOfPayments;
        const totalInterestValue = totalPaymentValue - principal;

        setEmi(Math.round(emiValue));
        setTotalInterest(Math.round(totalInterestValue));
        setTotalPayment(Math.round(totalPaymentValue));

        // Prepare pie chart data
        const principalPercentage = Math.round((principal / totalPaymentValue) * 100);
        const interestPercentage = Math.round((totalInterestValue / totalPaymentValue) * 100);

        setPieData([
            { name: 'Principal', value: principal, percentage: principalPercentage, color: COLORS[0] },
            { name: 'Interest', value: totalInterestValue, percentage: interestPercentage, color: COLORS[1] },
        ]);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 10000 && value <= 1000000) {
            setLoanAmount(value);
        }
    };

    const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value <= 30) {
            setLoanTenure(value);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Smart Loan Calculator
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Calculate your EMIs and understand the break-up of interest and principal payments with our interactive calculator
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Panel - Calculator */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-white h-fit rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200"
                    >
                        <div className="space-y-8">
                            {/* Loan Amount */}
                            <motion.div variants={itemVariants} className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-lg font-semibold text-gray-800">Loan Amount</label>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                        {formatCurrency(loanAmount)}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="10000"
                                    max="1000000"
                                    step="10000"
                                    value={loanAmount}
                                    onChange={handleAmountChange}
                                    className="w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>₹10K</span>
                                    <span>₹10L</span>
                                </div>
                            </motion.div>

                            {/* Interest Rate */}
                            <motion.div variants={itemVariants} className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-lg font-semibold text-gray-800">Interest Rate</label>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                        {interestRate.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="relative">
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        step="0.1"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                                        <span>1%</span>
                                        <span>20%</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Loan Tenure */}
                            <motion.div variants={itemVariants} className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-lg font-semibold text-gray-800">Loan Tenure</label>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                        {loanTenure} Years
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="1"
                                    value={loanTenure}
                                    onChange={handleTenureChange}
                                    className="w-full h-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>1 Year</span>
                                    <span>30 Years</span>
                                </div>
                            </motion.div>

                            {/* Quick Actions */}
                            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 pt-4">
                                {/* <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setLoanAmount(5000000)}
                                    className="p-4 rounded-xl border-2 border-blue-100 bg-blue-50 hover:bg-blue-100 transition-all duration-300"
                                >
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600">Home Loan</div>
                                        <div className="font-bold text-blue-600">₹50L</div>
                                    </div>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setLoanAmount(1000000)}
                                    className="p-4 rounded-xl border-2 border-cyan-100 bg-cyan-50 hover:bg-cyan-100 transition-all duration-300"
                                >
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600">Personal Loan</div>
                                        <div className="font-bold text-cyan-600">₹10L</div>
                                    </div>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setLoanAmount(2000000)}
                                    className="p-4 rounded-xl border-2 border-emerald-100 bg-emerald-50 hover:bg-emerald-100 transition-all duration-300"
                                >
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600">Car Loan</div>
                                        <div className="font-bold text-emerald-600">₹20L</div>
                                    </div>
                                </motion.button> */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setLoanAmount(1000000);
                                        setInterestRate(8.5);
                                        setLoanTenure(20);
                                    }}
                                    className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                                >
                                    <div className="text-center">
                                        <div className="text-sm font-bold text-gray-600">Reset All</div>
                                        <div className="font-bold text-gray-700">↺</div>
                                    </div>
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Panel - Results & Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Results Card */}
                        <div className="bg-linear-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 text-white shadow-xl">
                            <h3 className="text-2xl font-bold mb-6">Monthly EMI</h3>
                            <div className="text-5xl md:text-6xl font-bold mb-2">
                                {formatCurrency(emi)}
                            </div>
                            <p className="text-blue-100 mb-8">Per month for {loanTenure * 12} months</p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <div className="text-sm text-blue-200">Total Interest</div>
                                    <div className="text-2xl font-bold">{formatCurrency(totalInterest)}</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                    <div className="text-sm text-blue-200">Total Payment</div>
                                    <div className="text-2xl font-bold">{formatCurrency(totalPayment)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Pie Chart Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Breakdown</h3>

                            <div className="h-64 md:h-72 lg:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percentage }: any) => `${name}: ${percentage}%`}
                                            outerRadius="80%"
                                            innerRadius="60%"
                                            fill="#8884d8"
                                            dataKey="value"
                                            paddingAngle={5}
                                            strokeWidth={2}
                                            stroke="#ffffff"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => [formatCurrency(value as number), 'Amount']}
                                            contentStyle={{
                                                borderRadius: '12px',
                                                border: '1px solid #e5e7eb',
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                            }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Detailed Breakdown */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                {pieData.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <div>
                                                <div className="font-semibold text-gray-800">{item.name}</div>
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {formatCurrency(item.value)}
                                                </div>
                                                <div className="text-sm text-gray-600">{item.percentage}% of total</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Loan Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                            {[
                                { label: 'Low Interest', value: 'From 7.5%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                                { label: 'Quick Approval', value: '24-48 Hrs', color: 'text-blue-600', bg: 'bg-blue-50' },
                                { label: 'Flexible Tenure', value: 'Up to 30Y', color: 'text-cyan-600', bg: 'bg-cyan-50' },
                                { label: 'High Amount', value: 'Up to ₹5Cr', color: 'text-violet-600', bg: 'bg-violet-50' },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className={`${feature.bg} rounded-xl p-4 text-center border border-transparent hover:border-gray-300 transition-all duration-300`}
                                >
                                    <div className={`text-lg font-bold ${feature.color}`}>{feature.value}</div>
                                    <div className="text-sm text-gray-600">{feature.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Ready to Apply for Your Loan?
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Get personalized loan offers with competitive rates and flexible repayment options.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Apply Now
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-300"
                            >
                                Schedule Call
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}