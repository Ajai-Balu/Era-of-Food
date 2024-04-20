package com.eof.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;

import com.eof.bo.RecipeBO;
import com.eof.dao.RecipeDAO;

/**
 * Servlet implementation class UpdateRecipe
 */
@WebServlet("/UpdateRecipe")
public class UpdateRecipe extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static Logger errorLog = Logger.getLogger("errorLogger"); 
	static Logger statusLog = Logger.getLogger("statusLogger");    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateRecipe() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject resobj = null;
		RecipeBO recipeBO = new RecipeBO();
        RecipeDAO recipeDAO = new RecipeDAO();
		try{
    		resobj = new JSONObject();
            recipeBO.setTitle(request.getParameter("Title"));
            recipeBO.setCategory(request.getParameter("Category"));
            recipeBO.setDish(request.getParameter("Dish"));
            recipeBO.setCuisine(request.getParameter("Cuisine"));
            recipeBO.setPrepareTime(Integer.valueOf(request.getParameter("Prepare")));
            recipeBO.setCookingTime(Integer.valueOf(request.getParameter("Cooking")));
            recipeBO.setTotalTime(Integer.valueOf(request.getParameter("Total")));
            recipeBO.setYield(request.getParameter("Yield"));
            recipeBO.setAbout(request.getParameter("About"));
            recipeBO.setIngredients(request.getParameter("Ingredients"));
            recipeBO.setInstruction(request.getParameter("Instructions"));
            if(Integer.valueOf(request.getParameter("Img_avl")) == 1){
            	recipeBO.setImg_avl(1);
            	recipeBO.setImgData( request.getParameter("Img"));
            }
            recipeBO.setRecipe_id(Integer.valueOf(request.getParameter("recipe_id")));
            recipeDAO.updateRecipeData(recipeBO);
            System.out.println("Response ::: "+recipeBO.getResult());
            resobj.put("status", recipeBO.getResult());
        	response.getWriter().append(resobj.toString());
        	statusLog.info("Recipe added Response sended to the front end");
        	
		}catch (Exception e) {
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
