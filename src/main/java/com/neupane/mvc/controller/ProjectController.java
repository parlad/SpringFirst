package com.neupane.mvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.neupane.mvc.service.ProjectService;

@Controller
@RequestMapping("/project")
public class ProjectController {

	@Autowired
	private ProjectService projectService;

	@RequestMapping(value = "/find")
	public String find(Model modedl) {
		modedl.addAttribute("projects", projectService.findAll());
		return "projects";
	}

	@RequestMapping(value = "/{projectId}")
	public String findProject(Model model, @PathVariable Long projectId) {
		model.addAttribute("project", projectService.find(projectId));
		return "project";
	}

	@RequestMapping(value = "/add", method = RequestMethod.GET)
	public String addProject() {
		System.out.println("invoking the project");
		return "project_add";
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public String saveProject() {
		System.out.println("saving the project");
		return "project_add";
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST, params = { "type=multi" })
	public String saveMultiYearProject() {
		System.out.println("saving multi year the project");
		return "project_add";
	}

	@RequestMapping(value = "/add", method = RequestMethod.POST, params = { "type=multi", "special" })
	public String saveSpecialYearProject() {
		System.out.println("saving special project");
		return "project_add";
	}

}
