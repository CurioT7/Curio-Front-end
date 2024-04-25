import React from "react";
import axios from 'axios';


const hostUrl = import.meta.env.VITE_SERVER_HOST;

const token = localStorage.getItem('token');


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