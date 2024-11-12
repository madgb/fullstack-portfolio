// src/pages/EditPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditPage = ({ match }) => {
    const [portfolioData, setPortfolioData] = useState({
        name: '',
        bio: '',
        projects: [{ title: '', description: '', link: '' }],
    });

    useEffect(() => {
        // 포트폴리오 데이터를 불러오는 API 요청
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

    // 입력값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPortfolioData({ ...portfolioData, [name]: value });
    };

    // 프로젝트 정보 변경 처리
    const handleProjectChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProjects = [...portfolioData.projects];
        updatedProjects[index][name] = value;
        setPortfolioData({ ...portfolioData, projects: updatedProjects });
    };

    // 프로젝트 추가
    const addProject = () => {
        setPortfolioData({
            ...portfolioData,
            projects: [...portfolioData.projects, { title: '', description: '', link: '' }],
        });
    };

    // 프로젝트 삭제
    const removeProject = (index) => {
        const updatedProjects = portfolioData.projects.filter((_, i) => i !== index);
        setPortfolioData({ ...portfolioData, projects: updatedProjects });
    };

    // 데이터 저장
    const savePortfolio = async () => {
        try {
            await axios.put(`/api/portfolios/${match.params.username}`, portfolioData);
            alert("Portfolio updated successfully!");
        } catch (error) {
            console.error("Error updating portfolio:", error);
        }
    };

    return (
        <div className="flex flex-col items-center bg-gray-50 min-h-screen py-10 px-4">
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">Edit Portfolio</h1>

                {/* 이름 입력 필드 */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={portfolioData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                </div>

                {/* 소개 입력 필드 */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Bio</label>
                    <textarea
                        name="bio"
                        value={portfolioData.bio}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg"
                        rows="4"
                    />
                </div>

                {/* 프로젝트 목록 편집 */}
                <h2 className="text-2xl font-semibold text-blue-600 mb-2">Projects</h2>
                {portfolioData.projects.map((project, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                        <div className="mb-2">
                            <label className="block text-gray-700 font-semibold mb-1">Project Title</label>
                            <input
                                type="text"
                                name="title"
                                value={project.title}
                                onChange={(e) => handleProjectChange(index, e)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 font-semibold mb-1">Description</label>
                            <textarea
                                name="description"
                                value={project.description}
                                onChange={(e) => handleProjectChange(index, e)}
                                className="w-full px-3 py-2 border rounded-lg"
                                rows="2"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 font-semibold mb-1">Link</label>
                            <input
                                type="url"
                                name="link"
                                value={project.link}
                                onChange={(e) => handleProjectChange(index, e)}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeProject(index)}
                            className="text-red-500 mt-2"
                        >
                            Remove Project
                        </button>
                    </div>
                ))}

                {/* 프로젝트 추가 버튼 */}
                <button
                    type="button"
                    onClick={addProject}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
                >
                    Add Project
                </button>

                {/* 저장 버튼 */}
                <button
                    type="button"
                    onClick={savePortfolio}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg mt-6"
                >
                    Save Portfolio
                </button>
            </div>
        </div>
    );
};

export default EditPage;
