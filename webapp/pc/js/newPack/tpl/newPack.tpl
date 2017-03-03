<div class="newPack-input-group">
	<label for="basic-url">项目名称</label>
	<input name="projectName" class="form-control" type="text" placeholder="请输入项目名称">
</div>


<div class="newPack-input-group">
	<label for="basic-url">svn URL（只需填到版本根目录）</label>
	<div class="input-group">
		<span class="input-group-addon" id="basic-addon3">https://nfd-server02/svn/</span>
		<input name="svnUrl" type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder="请输入项目地址，如：p2p/preRelease/">
	</div>
</div>




<div class="newPack-input-group">
	<label for="basic-url">fis 命令</label>
	<select name="fisMedia" class="form-control">
		<option value="dist">fis3 release dist</option>
		<option value="test">fis3 release test</option>
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





