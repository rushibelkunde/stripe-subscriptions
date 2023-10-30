"use client"
import React from "react";
import { useEffect } from "react";
export const StripePricingTable = () => {

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/pricing-table.js";
      script.async = true;
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
  
    }, []);
  
    return React.createElement("stripe-pricing-table", {
      "pricing-table-id": "prctbl_1O6re8SBrZ5nXiOsukOiWqk0",
      "publishable-key":
        "pk_test_51O6pZKSBrZ5nXiOs9KcbaxsT9NzOG2PrBhMCg6KWt0NhClSPZJxAHrRpTT0CFqCeUx4n67cam7YPd0ljlRLNNkyP00Y0T2Rhri",
    });
  
  };