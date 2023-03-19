import CodeEditor from "./CodeEditor";

function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="p-3 mb-2 bg-light text-dark">
            <CodeEditor>
                
            </CodeEditor>
            {children}
        </div>
    );
}
 
export default Layout;