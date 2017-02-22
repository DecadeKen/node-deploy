<div class="newPack-input-group">
	<label for="basic-url">项目名称</label>
	<input name="projectName" class="form-control" type="text" placeholder="请输入项目名称">
</div>

<div class="newPack-input-group">
	<label for="basic-url">svn URL</label>
	<select name="svnUrl" class="form-control">
		<%for(var i=0 ; i< svnUrl.length; i++) {%>
			<option value=<%=i%>> <%=svnUrl[i]%></option>
		<%}%>
	</select>
</div>



<div class="newPack-input-group">
	<label for="basic-url">fis 命令</label>
	<select name="fisMedia" class="form-control">
		<option value="dist">fis3 release dist</option>
		<option value="test">fis3 release test</option>
		<option value="dev">fis3 release dev</option>
	</select>
</div>

<div class="newPack-input-group">
	<label for="basic-url">目标服务器</label>
	<select name="serverId" class="form-control">
		<%for(var i=0 ; i< server.length; i++) {%>
			<option value=<%=i%>> <%=server[i].host%></option>
		<%}%>

	</select>
</div>
<div class="newPack-save-btn">
	<button type="button" class="btn btn-success ">保存</button>

</div>





