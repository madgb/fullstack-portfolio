// src/pages/PortfolioPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PortfolioPage = ({ match }) => {
    const [portfolioData, setPortfolioData] = useState(null);

    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const response = await axios.get(`/api/portfolios/${match.params.username}`);
                setPortfolioData(response.data);
            } catch (error) {
                console.error("Error fetching portfolio data:", error);
            }
        };

        fetchPortfolioData();
    }, [match.params.username]);

    if (!portfolioData) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center bg-gray-50 min-h-screen py-10 px-4">
            {/* 헤더 섹션 */}
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">{portfolioData.name}</h1>
                <p className="text-center text-gray-700 text-lg mb-4">{portfolioData.bio}</p>
            </div>

            {/* 프로젝트 목록 섹션 */}
            <div className="w-full max-w-4xl mt-8">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Projects</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {portfolioData.projects.map((project) => (
                        <div key={project.id} className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                            <p className="text-gray-600 mt-2">{project.description}</p>
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 mt-4 inline-block"
                                >
                                    View Project
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
