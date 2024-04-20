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
 * Servlet implementation class UpdateUser
 */
@WebServlet("/UpdateUser")
public class UpdateUser extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger errorLog = Logger.getLogger("errorLogger"); 
	static Logger statusLog = Logger.getLogger("statusLogger");
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateUser() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject resobj = new JSONObject();
		UserDataBO userBO = new UserDataBO();
		UserDataDAO userdataDAO = new UserDataDAO();
        try{
            userBO.setUser_name(request.getParameter("Name"));
            userBO.setAge(Integer.valueOf(request.getParameter("Age")));
            userBO.setGender(request.getParameter("Gender"));
            userBO.setEmail(request.getParameter("Email"));
            userBO.setPhone_number(request.getParameter("PhoneNumber"));
            userBO.setLikes(request.getParameter("Likes"));
            userBO.setPassword(request.getParameter("Pass"));
            userBO.setUser_id(Integer.valueOf(request.getParameter("UserID")));
            if(request.getParameter("NewPass_avl").equals("true")){
            	userBO.setNewpassAvl(1);
            	userBO.setNewpassword(request.getParameter("NewPass"));
            }
            userdataDAO.updateUserDetails(userBO);
    		resobj.put("status", userBO.getResult());
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
