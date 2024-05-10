import React from "react";
import axios from 'axios';


const hostUrl = import.meta.env.VITE_SERVER_HOST;

const token = localStorage.getItem('token');


/**
 * Reports a user with the specified details.
 *
 * @param {string} reportedUsername - The username of the user being reported.
 * @param {string} reportType - The type of report.
 * @param {string} reportReason - The reason for the report.
 * @param {string} reportDetails - Additional details about the report.
 * @module ReportSpecificUser
 */
const reportUser = async (reportedUsername, reportType, reportReason ,reportDetails ) => {
  try {
      const response = await axios.post(`${hostUrl}/api/report_user`, {
          reportedUsername: reportedUsername,
          reportType: reportType,
          reportReason: reportReason,
          reportDetails: reportDetails
      }, {
          headers: {
              authorization : `Bearer ${token}`
          }
      });

      return response.data;
  } catch (error) {
      console.error(error);
  }
};

export { reportUser };