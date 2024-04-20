package com.eof.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.eof.bo.UserDataBO;
import com.eof.dao.UserDataDAO;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger errorLog = Logger.getLogger("errorLogger"); 
	static Logger statusLog = Logger.getLogger("statusLogger");
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject resobj = null;
		UserDataBO userBO = new UserDataBO();
		UserDataDAO userdataDAO = new UserDataDAO();
        try {
    		resobj = new JSONObject();
            userBO.setEmail(request.getParameter("Email"));
            userBO.setPassword(request.getParameter("Pass"));
            userdataDAO.validate(userBO);
            System.out.println("Response ::: "+userBO.getResult());
            if((userBO.getResult()).equals("true")) {
            	resobj.put("status",userBO.getResult());
            	resobj.put("User_id", userBO.getUser_id());
            	resobj.put("name", userBO.getUser_name());
            	resobj.put("role", userBO.getRole());
        		System.out.println("Session ::: NAME :: "+userBO.getUser_name()+" ID :: "+userBO.getUser_id());
        		statusLog.info("Response sended to the front end");
        	}else {
        		resobj.put("status",userBO.getResult());
        	}
            response.getWriter().append(resobj.toString());
	    } catch (Exception e) {
	    	errorLog.error("Error Occur on Servlets");
	        e.printStackTrace();
	    }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
