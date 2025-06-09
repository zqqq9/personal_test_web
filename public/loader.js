// 这个脚本用于处理主应用程序的加载
// 避免使用 ES 模块语法，以防止 MIME 类型问题

(function() {
  console.log('加载器脚本执行...');
  
  // 函数：加载 JavaScript 文件
  function loadScript(src, callback) {
    var script = document.createElement('script');
    script.onload = callback;
    script.onerror = function(e) {
      console.error('脚本加载失败:', src, e);
      showLoadError('脚本加载失败: ' + src);
    };
    script.src = src;
    document.body.appendChild(script);
    return script;
  }

  // 函数：加载 CSS 文件
  function loadCSS(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    return link;
  }

  // 显示加载错误
  function showLoadError(message) {
    var rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(to bottom right, #1a202c, #000000); color: white; text-align: center; padding: 20px;">
          <h1 style="font-size: 2rem; margin-bottom: 1rem;">应用加载失败</h1>
          <p style="font-size: 1.25rem; margin-bottom: 2rem;">${message}</p>
          <button onclick="window.location.reload()" style="background-color: #4a90e2; border: none; color: white; padding: 10px 20px; font-size: 1rem; border-radius: 4px; cursor: pointer;">
            刷新页面
          </button>
        </div>
      `;
    }
  }

  // 尝试从 Netlify 预构建的资产目录获取文件
  fetch('/assets/')
    .then(response => {
      if (!response.ok) {
        throw new Error('无法访问资产目录');
      }
      return response.text();
    })
    .then(html => {
      // 尝试找到 JS 和 CSS 文件
      var jsFileMatch = html.match(/href="(\/assets\/index-[^"]+\.js)"/);
      var cssFileMatch = html.match(/href="(\/assets\/index-[^"]+\.css)"/);
      
      if (cssFileMatch && cssFileMatch[1]) {
        loadCSS(cssFileMatch[1]);
      } else {
        console.warn('未找到 CSS 文件');
      }
      
      if (jsFileMatch && jsFileMatch[1]) {
        loadScript(jsFileMatch[1], function() {
          console.log('主应用程序加载完成');
        });
      } else {
        console.error('未找到 JS 文件');
        loadScript('/assets/index-BNtqlhuY.js', function() {
          console.log('使用硬编码路径加载主应用程序');
        });
      }
    })
    .catch(error => {
      console.error('加载资产失败:', error);
      
      // 回退方案：尝试直接加载最近的已知资产
      loadCSS('/assets/index-CgQxaznl.css');
      loadScript('/assets/index-BNtqlhuY.js', function() {
        console.log('使用硬编码回退路径加载主应用程序');
      });
    });
})(); 