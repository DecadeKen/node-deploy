<div class="newPack-input-group">
	<label for="basic-url">项目名称</label>
	<input name="projectName" class="form-control" type="text" placeholder="请输入项目名称">
</div>

<div class="newPack-input-group">
	<label for="basic-url">SVN URL</label>
	<input name="svnUrl" class="form-control" type="text" placeholder="请输入SVN地址，如https://nfd-server02/svn/p2p/preRelease">
</div>

<div class="newPack-input-group">
	<label for="basic-url">工作目录</label>
	<input name="workSpace" class="form-control" type="text" placeholder="请输入工作目录地址，如/Users/ken/workSpace/p2p">
</div>

<div class="newPack-input-group">
	<label for="basic-url">FIS 命令</label>
	<select name="fisMedia" class="form-control">
		<option value="dist">fis3 release dist</option>
		<option value="test">fis3 release test</option>
		<option value="dev">fis3 release dev</option>
	</select>
</div>

<div class="newPack-input-group">
	<label for="basic-url">目标服务器</label>
	<select name="serverUrl" class="form-control">
		<%for(var i=0 ; i< serversConfig.length; i++) {%>
			<option value=<%=i%>> <%=serversConfig[i].ip%></option>
		<%}%>

	</select>
</div>
<div class="newPack-save-btn">
	<button type="button" class="btn btn-success ">保存</button>

</div>





