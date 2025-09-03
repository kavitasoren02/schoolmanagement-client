import React, { useState, useEffect } from 'react';

export const SchoolCard = ({ school }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
        <div className="relative">
            <img
                src={`https://schoolmanagement-server.onrender.com/${school.image}`}
                alt={school.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                    e.target.src = `data:image/svg+xml;base64,${btoa(`
              <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="200" fill="#f3f4f6"/>
                <text x="150" y="100" font-family="Arial, sans-serif" font-size="16" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
                  School Image
                </text>
              </svg>
            `)}`;
                }}
            />
            <div className="absolute top-4 right-4">
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    School
                </span>
            </div>
        </div>

        <div className="p-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                {school.name}
            </h3>

            <div className="space-y-2">
                <div className="flex items-start">
                    <svg className="w-4 h-4 text-gray-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {school.address}
                    </p>
                </div>

                <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-gray-500 text-sm font-medium">
                        {school.city}, {school.state}
                    </p>
                </div>
            </div>

            {/* Footer Section */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">ID: {school.id}</span>
                <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition">
                    View Details
                </button>
            </div>
        </div>
    </div>
);