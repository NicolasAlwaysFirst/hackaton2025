import React, { Component } from 'react'

export default class TableSkeleton extends Component {
  render() {
    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md animate-pulse">
        <div className="space-x-4">
          <div className="w-32 h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-32 h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-32 h-6 bg-gray-300 rounded mb-2"></div>
          <div className="w-24 h-6 bg-gray-300 rounded mb-2"></div>
        </div>
      </div>
    )
  }
}
