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
 * Servlet implementation class SignUp
 */
@WebServlet("/SignUp")
public class SignUp extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger errorLog = Logger.getLogger("errorLogger"); 
	static Logger statusLog = Logger.getLogger("statusLogger");
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SignUp() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject resobj = null;
		UserDataBO userBO = new UserDataBO();
		UserDataDAO userdataDAO = new UserDataDAO();
        try{
    		resobj = new JSONObject();
            userBO.setUser_name(request.getParameter("Name"));
            userBO.setAge(Integer.valueOf(request.getParameter("Age")));
            userBO.setGender(request.getParameter("Gender"));
            userBO.setEmail(request.getParameter("Email"));
            userBO.setPhone_number(request.getParameter("PhoneNumber"));
            userBO.setLikes(request.getParameter("Likes"));
            userBO.setPassword(request.getParameter("Pass"));
            userdataDAO.insertData(userBO);
            System.out.println("Response ::: "+userBO.getResult());
            resobj.put("status", userBO.getResult());
            if((userBO.getResult()).equals("true")){
        		statusLog.info("User added Response sended to the front end");
        	}else {
        		statusLog.info("user not added Response sended to the front end");
        	}
            response.getWriter().append(resobj.toString());
        }catch (Exception e) {
        	errorLog.error("Error Occur on Servlets");
            e.printStackTrace();
        }
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
