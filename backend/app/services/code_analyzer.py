import ast  # Abstract syntax tree
# (python ka buil-in module jo code ko structure mein convert karta hai)


def analyze_code(code: str):
    tree = ast.parse(code)

    functions = [node for node in ast.walk(tree) if isinstance(node, ast.FunctionDef)]
    lines = code.split("\n")

    complexity_score = len(functions) * 10 + len(lines)

    return {
        "lines_of_code": len(lines),
        "number_of_functions": len(functions),
        "complexity_score": complexity_score,
        "quality": "Good" if complexity_score < 200 else "Needs Improvement",
    }
